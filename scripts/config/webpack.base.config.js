const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const entrys = require('./utils/entrys')
const config = require('./index')

const resolve = function (dir) {
  return path.join(process.cwd(), './', dir)
}

const env = config.env === 'production' ? 'prod' : 'dev'

module.exports = {
  entry: entrys,
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },

      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(config.env),
        PORT: JSON.stringify(config.port),
        PUBLIC_PATH: JSON.stringify(config.publicPath)
      }
    }),
    new CopyWebpackPlugin([
      {
        from: './src/modules/content/inject.js',
        to: resolve(`dist/${env}/modules/content/inject.js`),
        toType: 'file'
      },
      {
        from: `./src/manifest.${env}.json`,
        to: resolve(`dist/${env}/manifest.json`),
        toType: 'file'
      }
    ])
  ]
}
