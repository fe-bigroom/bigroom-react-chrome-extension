const klawSync = require('klaw-sync')

module.exports = function entrys() {
  const entrys = {};
  const hotScript = 'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true';

  try {
    const paths = klawSync('src/modules/', { nodir: false, depthLimit: 0 })

    paths.forEach((entry) => {
      const file = entry.path.match(/([^/]+)$/)
      if (file) {
        entrys[file[1]] = [hotScript, `${entry.path}/${file[1]}.js`]
      }
    })

    return entrys
  } catch (err) {
    console.error(err)
  }

  return []
}
