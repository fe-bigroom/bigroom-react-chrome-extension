const path = require('path')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseWebpackConfig, {
  output: {
    filename: '[name]/[name].bundle.js',
    path: path.resolve('dist/prod/modules')
  },
  mode: 'production',
  plugins: [
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
})
