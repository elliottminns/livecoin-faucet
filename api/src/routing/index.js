const Router = require('koa-router')
const entries = require('../api/entries/routes')
const payouts = require('../api/payouts/routes')

const routes = {
  '/entries': entries,
  '/payouts': payouts
}

const router = Router()

module.exports = Object.keys(routes).reduce((router, key) => {
  const route = routes[key]
  const r = route.routes(Router())
  router.use(key, r.routes())
  return router
}, router)

module.exports = router
