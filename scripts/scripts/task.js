const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const klawSync = require('klaw-sync')

const { host, port } = require('../config')

module.exports = function taskRun(env) {
  // copy chrome resources to dist/dev
  const chromeSrc = path.resolve('./src')
  const devDist = path.resolve(`./dist/${env}`)
  const manifestPath = path.resolve('./src/manifest.json')
  const assetsPath = path.resolve('./src/assets')
  const pagesPath = path.resolve('./src/pages')

  fse.copySync(chromeSrc, devDist, {
    filter: (src) => {
      return (
        chromeSrc === src ||
        src.indexOf(pagesPath) !== -1 ||
        src.indexOf(assetsPath) !== -1 ||
        src === manifestPath
      );
    }
  })

  // replace
  const pagesDir = path.resolve(`./dist/${env}/pages`)
  replaceJsFiles(env, pagesDir)
}

function replaceJsFiles(env, tpl) {
  const isdir = fs.statSync(tpl).isDirectory()
  const files = []

  if (!isdir) {
    files.push({ path: tpl })
  } else {
    files.push(...klawSync(tpl, { nodir: true, depthLimit: 1 }))
  }

  files.forEach((file) => {
    let content = fse.readFileSync(file.path, 'utf8')
    const matchs = content.match(/\{\{[^{}]+\}\}/g)

    if (matchs) {
      matchs.forEach((match) => {
        const fileName = match.replace(/[{} ]/g, '').replace('.js', '')
        let fileUrl = ''

        if (env === 'dev') {
          fileUrl = `http://${host}:${port}/${fileName}/${fileName}.js` // todo 这里应当为 https
        } else {
          fileUrl = `../modules/${fileName}/${fileName}.js`
          fse.removeSync(`./dist/${env}/modules/${fileName}/${fileName}.js`)
        }

        content = content.replace(match, fileUrl)
      })
    }

    fs.writeFileSync(file.path, content, { encoding: 'utf8' });
  })
}