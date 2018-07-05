const config = require('../configuration')
const secret = config.get('COINHIVE_CATPCHA_SECRET_KEY')
const hashes = config.get('COINHIVE_NUMBER_HASHES')
const request = require('request-promise-native')

module.exports = {
  async validate(token) {
    const url = 'https://api.coinhive.com/token/verify'
    const body = {
      token, hashes, secret
    }

    const result = JSON.parse(await request.post(url).form(body))
    if (result.success !== true) {
      throw new Error('Did not validate captcha')
    }
  }
}
