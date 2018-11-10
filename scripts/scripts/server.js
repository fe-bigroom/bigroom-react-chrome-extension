const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const { port, host } = require('../config')
const webpackConfig = require('../config/webpack.dev.config')
const webpackChromeExtensionsReloadMiddleware = require('../config/middlewares/webpack-chrome-extensions-reload-middleware')

module.exports = function server() {
  const app = express()
  const compiler = webpack(webpackConfig)
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'minimal'
  })

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(devMiddleware)

  // auto reload when saveing code
  app.use('/sse', webpackChromeExtensionsReloadMiddleware(compiler));

  devMiddleware.waitUntilValid(() => {
    console.log()
    console.log('> Starting dev server...')
    console.log(`> Listening at http://${host}:${port}\n`)
  })

  // Serve the files on port.
  app.listen(port, () => {})
}
