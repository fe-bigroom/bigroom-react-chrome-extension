module.exports = {
  host: 'localhost',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  publicPath: process.env.PUBLIC_PATH || 'js/'
}