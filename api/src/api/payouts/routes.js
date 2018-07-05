const controller = require('./controller')

exports.readPayouts = async function(ctx) {
  const limit = ctx.request.query.limit || 20
  const payouts = await controller.read({ limit })
  ctx.body = payouts
}

exports.routes = function(router) {
  router.get('/', this.readPayouts)
  return router
}
