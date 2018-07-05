'use strict'

const coinhive = process.env.COINHIVE_RECAPTCHA_SITE_KEY || 'oPlQZRutGf29yLd3Iaye10I44Cc5FKSU'
const numberHashes = process.env.COINHIVE_NUMBER_HASHES || '512'
const symbol = 'LVC'
const minutes = 10

module.exports = {
  NODE_ENV: '"production"',
  COINHIVE_RECAPTCHA_SITE_KEY: `"${coinhive}"`,
  COINHIVE_NUMBER_HASHES: `"${numberHashes}"`,
  CURRENCY_SYMBOL: `"${symbol}"`,
  NUM_MINUTES: `"${minutes}"`
}
