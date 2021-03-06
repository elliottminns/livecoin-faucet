const config = require('../configuration')
const RPC = require('./rpc')
const port = config.get('COIN_RPC_PORT')
const user = config.get('COIN_RPC_USER')
const password = config.get('COIN_RPC_PASS')
const url = config.get('COIN_RPC_URL')

class CoinService {
  constructor() {
    this.client = new RPC({ url, port, user, password })
  }

  async sendToMany(ledger) {
    if (Object.keys(ledger).length === 0) { return }
    return this.client.request('sendmany', ["", ledger]).then(r => r.result)
  }

  async getBalance() {
    return this.client.request('getbalance').then(r => r.result)
  }

  async getNewAddress() {
    return this.cleint.request('getnewaddress').then(r => r.result)
  }
}

module.exports = CoinService
