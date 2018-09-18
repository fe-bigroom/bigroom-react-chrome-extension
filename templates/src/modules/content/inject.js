// not to build

const contentjs = {
  data: {},

  sendMessage(action, callback = () => {}) {
    chrome.runtime.sendMessage({ _from: 'content', action }, (data, sender, response) => {
      callback(data, sender, response);
    });
  },

  onMessage(callback) {
    chrome.runtime.onMessage.addListener((data, sender, response) => {
      callback(data, sender, response);
    });
  },

  inject() {
    const { env, port, publicPath } = this.data;

    const div = document.createElement('div');
    div.setAttribute('id', 'chrome-content-root');
    document.body.appendChild(div);

    const script = document.createElement('script')
    const content = env === 'production' ? chrome.extension.getURL('modules/content/content.bundle.js') : `http://127.0.0.1:${port}/${publicPath}content.bundle.js`;
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', content);
    document.body.appendChild(script);

    return this;
  },

  listen() {
    this.onMessage(({ action, data }, sender, response) => { // eslint-disable-line
      switch (action) {
        case 'init':
          this.data = Object.assign({}, data);
          this.inject();
          break;

        default: break;
      }
    });

    return this;
  },

  run() {
    // 获取各种基础参数, 并往页面中注入脚本
    this.sendMessage('init');
  },
};

contentjs.listen().run();
