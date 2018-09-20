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

export {
  injectRootDom,
  sendMessage,
  onMessage,
};
