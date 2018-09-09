const fs = require('fs')

const { host, port, publicPath } = require('../config')

module.exports = function inject(filePaths) {
  let content = ''

  if (process.env.ENV_NODE === 'development') {
    content = `const div = document.createElement('div')
div.setAttribute('id', 'chrome-root')
document.body.appendChild(div)
const script = document.createElement('script')
script.setAttribute('type', 'text/javascript')
script.setAttribute('src', 'http://${host}:${port}/${publicPath}content.bundle.js')
document.body.appendChild(script)
`
  } else {
    content = `const div = document.createElement('div')
div.setAttribute('id', 'chrome-root')
document.body.appendChild(div)
const content = chrome.extension.getURL('${publicPath}content.js')
const script = document.createElement('script')
script.setAttribute('type', 'text/javascript')
script.setAttribute('src', content)
document.body.appendChild(script)
`
  }

  filePaths.map(filePath => fs.writeFileSync(filePath, content, { encoding: 'utf8' }));
}
