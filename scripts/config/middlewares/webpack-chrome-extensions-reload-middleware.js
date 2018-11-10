const SseStream = require('ssestream');

function webpackChromeExtensionsReloadMiddleware(compiler, opts = {}) {
  opts.heartbeat = opts.heartbeat || 5 * 1000;

  const middleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');

    const sseStream = new SseStream(req)
    sseStream.pipe(res)

    if (compiler.hooks) {
      compiler.hooks.done.tap('webpack-chrome-extensions-reload-middleware', () => {
        sseStream.write({
          event: 'compiled',
          data: 'compiled'
        })
      })
    }

    res.on('close', () => {
      console.log('close connection')
      sseStream.unpipe(res)
    })

    next();
  };
  return middleware;
}

module.exports = webpackChromeExtensionsReloadMiddleware;