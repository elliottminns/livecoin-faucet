var crypto = require('crypto');
var base58 = require('./base58');
const config = require('../configuration')


const address_types = {
  prod: config.get('COIN_SCRIPT_PREFIX'),
  testnet: '6f'
}

const p2sh_types = {
  prod: config.get('COIN_SCRIPT_PREFIX'),
  tesnet: 'c4'
}

function get_address_type(address) {
  var decoded_hex

  try {
    decoded_hex = base58.decode(address)
  } catch (e) {
    return null
  }

  var decoded = new Buffer(decoded_hex, 'hex')

  if (decoded.length != 25) {
    return null;
  }

  const length = decoded.length
  const cksum = decoded.slice(length - 4, length).toString('binary')
  const body = decoded.slice(0, length - 4)

  const good_cksum = sha256_digest(sha256_digest(body)).toString('binary').substr(0, 4)
  return (cksum === good_cksum ? decoded_hex.slice(0, 2) : null)
}

module.exports.get_address_type = get_address_type

function validate(address, address_type) {
  address_type = address_type || 'prod'

  const type = get_address_type(address)

  if (type === null) { return false}

  if (type !== address_types[address_type] &&
      type !== p2sh_types[address_type]) {
    return false
  }

  return true
}

module.exports.validate = validate

function sha256_digest(payload) {
  return crypto.createHash('sha256').update(payload).digest();
}
