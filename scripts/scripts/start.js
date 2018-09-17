const path = require('path')
const rm = require('rimraf')

const taskRun = require('./task')
const server = require('./server')

process.env.NODE_ENV = 'development'

rm(path.resolve(__dirname, '../dist/dev'), err => {
  if (err) throw err

  taskRun('dev')
  server()
})
