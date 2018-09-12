const div = document.createElement('div')
div.setAttribute('id', 'chrome-content-root')
document.body.appendChild(div)

const content = chrome.extension.getURL('js/content.js') // eslint-disable-line
const script = document.createElement('script')
script.setAttribute('type', 'text/javascript')
script.setAttribute('src', content)
document.body.appendChild(script)
