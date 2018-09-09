const path = require('path')
const webpack = require('webpack')
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
})
