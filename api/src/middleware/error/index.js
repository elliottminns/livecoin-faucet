module.exports = async function(ctx, next) {
  try {
    await next()
  } catch (error) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
}
