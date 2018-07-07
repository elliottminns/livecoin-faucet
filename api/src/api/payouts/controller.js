const Payout = require('./model')

exports.create = async function(data) {
  return Payout.create(data)
}

exports.read = async function({ limit }) {
  return Payout.find({}).limit(limit).select('-ip').sort('-createdAt')
}
