const Entry = require('./model')
const Address = require('../../address')

exports.create = async function({ address, ip }) {
  if (!Address.validate(address)) { throw new Error('Invalid address') }
  const entry = await Entry.create({ address, ip })
  return entry
}

exports.clear = async function() {
  await Entry.remove({})
}

exports.read = async function() {
  const entries = await Entry.find({})
  return entries
}
