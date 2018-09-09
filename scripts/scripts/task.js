const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const klawSync = require('klaw-sync')

const injectContent = require('./inject_content')
const { host, port, publicPath } = require('../config')

module.exports = function taskRun(env) {
  // copy chrome resources to dist/dev
  const chromeSrc = path.resolve('./src')
  const devDist = path.resolve(`./dist/${env}`)
  const modulePath = path.resolve('./src/modules')
  const injectPath = path.resolve('./src/modules/content/inject.js')

  fse.copySync(chromeSrc, devDist, {
    filter: (src) => {
      if (src === injectPath || fs.statSync(src).isDirectory()) {
        return true
      }
      return src.indexOf(modulePath) === -1
    }
  })

  // replace
  const pagesDir = path.resolve(`./dist/${env}/pages`)
  replaceJsFiles(env, pagesDir)

  // inject content
  const injectJsPaths = [
    path.resolve('./src/modules/content/inject.js'),
    path.resolve(`./dist/${env}/modules/content/inject.js`)
  ]
  injectContent(injectJsPaths)
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
          fileUrl = `http://${host}:${port}/${publicPath}${fileName}.bundle.js` // todo 这里应当为 https
        } else {
          fileUrl = `../modules/${fileName}/${fileName}.bundle.js`
          fse.removeSync(`./dist/${env}/modules/${fileName}/${fileName}.js`)
        }

        content = content.replace(match, fileUrl)
      })
    }

    fs.writeFileSync(file.path, content, { encoding: 'utf8' });
  })
}