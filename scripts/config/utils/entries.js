const klawSync = require('klaw-sync')

module.exports = function entries() {
  const entries = {};

  try {
    const paths = klawSync('src/modules/', { nodir: false, depthLimit: 0 })

    paths.forEach((entry) => {
      const file = entry.path.match(/([^/]+)$/)
      if (file) {
        entries[file[1]] = `${entry.path}/${file[1]}.js`
      }
    })

    return entries
  } catch (err) {
    console.error(err)
  }

  return []
}
