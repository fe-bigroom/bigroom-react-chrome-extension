const injectRootDom = (domId) => {
  const div = document.createElement('div');

  div.setAttribute('id', domId);
  document.body.appendChild(div);
}

const sendMessage = (action, callback = () => {}) => {
  chrome.runtime.sendMessage({ _from: 'content', action }, (data, sender, response) => {
    callback(data, sender, response);
  });
}

const onMessage = (callback) => {
  chrome.runtime.onMessage.addListener((data, sender, response) => {
    callback(data, sender, response);
  });
}

const onExtensionReload = (port) => {
  if ('EventSource' in window) {
    const source = new EventSource(`http://localhost:${port}/sse`)

    source.addEventListener('open', (event) => {
      console.log('Auto Reload Listen: ', event);
    }, false);

    source.addEventListener('compiled', (event) => {
      console.log('compiled: ', event);
      chrome.runtime.sendMessage({ _from: 'content', action: 'compiled' }, () => {
        source.close();
        window.history.go(0);
      });
    }, false);

    source.addEventListener('error', (event) => {
      console.log('error: ', event);
    }, false);
  }
}

export {
  injectRootDom,
  sendMessage,
  onMessage,
  onExtensionReload,
};
