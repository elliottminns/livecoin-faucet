const controller = require('./controller')
const Captcha = require('../../captcha')

exports.create = async function(ctx) {
  const address = ctx.request.body.address
  const captcha = ctx.request.body.captcha
  const ip = ctx.request.ip

  await Captcha.validate(captcha)

  const entry = await controller.create({ address, ip })

  ctx.body = { 'success': true }
}

exports.routes = function(router) {
  router.post('/', this.create)
  return router
}
