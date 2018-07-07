const schedule = require('node-schedule')
const Entries = require('../api/entries/controller')
const Payouts = require('../api/payouts/controller')
const config = require('../../../faucet.json')
const rn = require('random-number')
const CoinService = require('../coinservice')
const Mailer = require('../mailer')

class Faucet {
  constructor() {
    this.minutes = config.minutes
    this.coinservice = new CoinService()
    this.sendTopup = true
    this.mailer = new Mailer()
  }

  async start() {
    this.job = schedule.scheduleJob(
      `*/${this.minutes} * * * *`, async () => {
        try {
          await this.runFaucet()
        } catch (error) {
          console.log(error);
        }
    })
  }

  async runFaucet() {
    const entries = await Entries.read()
    await Entries.clear()

    if (entries.length == 0) { return }

    const roll = config.roll
    const gen = rn.generator({
      min: roll.min,
      max: roll.max,
      integer: true
    })

    const entryRewards = entries.map((e) => {
      const value = gen();
      const reward = this.rewardForValue(value)
      const entry = e.toObject()
      entry.amount = reward
      entry.roll = value
      return entry
    })

    const prizes = entryRewards.reduce((res, e) => {
      res[e.address] = (e.amount / 1e8)
      return res
    }, {})

    const txid = await this.coinservice.sendToMany(prizes)
    await this.createPayouts({ entries: entryRewards, txid })
    await this.checkBalance()
  }

  rewardForValue(value) {
    const rewards = config.rewards
    return rewards.reduce((res, reward) => {
      const max = reward.chance + res.previous
      const min = res.previous

      if (value <= max && value > min) {
        res.prize = reward.prize
      }

      res.previous = max
      return res
    }, { previous: 0, prize: 0 }).prize
  }

  createPayouts({ entries, txid }) {
    const creates = entries.map((entry) => {
      return Payouts.create({
        address: entry.address,
        ip: entry.ip,
        amount: entry.amount,
        txid: txid, 
        roll: entry.roll
      })
    })
  }

  async checkBalance() {
    const balance = await this.coinservice.getBalance()
    if (balance < config.min_balance) {
      if (this.sendTopup) {
        const address =  await this.coinservice.getNewAddress()
        this.mailer.sendCoinTopupMail({ address, balance })
        this.sendTopup = false
      }
    } else {
      this.sendTopup = true
    }
  }
}

module.exports = new Faucet()
