const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const entrys = require('./utils/entrys')

const resolve = function (dir) {
  return path.join(process.cwd(), './', dir)
}

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
        NODE_ENV: JSON.stringify(process.env.ENV_NODE || 'development'),
        PORT: JSON.stringify(process.env.PORT || 3000),
        PUBLIC_PATH: JSON.stringify(process.env.PUBLIC_PATH || 'js/')
      }
    }),
    new CopyWebpackPlugin([
      {
        from: './src/modules/content/inject.js',
        to: resolve(`dist/${process.env.ENV_NODE === 'production' ? 'prod' : 'dev'}/modules/content/inject.js`),
        toType: 'file'
      },
    ]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
