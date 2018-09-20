const path = require('path')
const webpackMerge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseWebpackConfig, {
  output: {
    filename: '[name]/[name].js',
    path: path.resolve('dist/prod/modules')
  },
  mode: 'production',
  plugins: []
})
