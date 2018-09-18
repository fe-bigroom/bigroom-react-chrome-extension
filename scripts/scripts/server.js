const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const { port, host } = require('../config')
const webpackConfig = require('../config/webpack.dev.config')

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
  app.use(webpackHotMiddleware(compiler))

  devMiddleware.waitUntilValid(() => {
    console.log()
    console.log('> Starting dev server...')
    console.log(`> Listening at http://${host}:${port}\n`)
  })

  // Serve the files on port.
  app.listen(port, () => {})
}
