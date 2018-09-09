const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const { publicPath } = require('../config')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseWebpackConfig, {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: `/${publicPath}`
  },
  devServer: {
    contentBase: './dist/dev',
    compress: true
  },
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})
