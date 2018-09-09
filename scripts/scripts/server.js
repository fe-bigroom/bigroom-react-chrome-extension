const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const { port } = require('../config')
const webpackConfig = require('../config/webpack.dev.config')

module.exports = function server() {
  const app = express()
  const compiler = webpack(webpackConfig)

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: 'minimal'
  }))

  app.use(webpackHotMiddleware(compiler))

  // Serve the files on port.
  app.listen(port, () => {})
}
