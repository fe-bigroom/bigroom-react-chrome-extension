const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')

const taskRun = require('./task')
const webpackConfig = require('../config/webpack.prod.config')

const spinner = ora('building for production...\n')
spinner.start()

rm(path.resolve(__dirname, '../dist/prod'), err => {
  if (err) throw err

  taskRun('prod')

  webpack(webpackConfig, function (err, stats) {
    spinner.stop()

    if (err) throw err

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
