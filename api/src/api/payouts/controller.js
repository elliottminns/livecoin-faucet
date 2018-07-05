const Payout = require('./model')

exports.create = Payout.create

exports.read = async function({ limit }) {
  return Payout.find({}).limit(limit).select('-ip').sort('-createdAt')
}
