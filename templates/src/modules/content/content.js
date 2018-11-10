import React from 'react';
import ReactDOM from 'react-dom';

import { injectRootDom, onMessage, sendMessage, onExtensionReload } from './util'; // eslint-disable-line
import App from './App';

const content = {
  contentId: 'chrome-content-root',

  run() {
    this.listen();
    sendMessage('init');
    injectRootDom(this.contentId);

    this.render();
  },

  listen() {
    onMessage(({ action, data }, sender, response) => { // eslint-disable-line
      switch (action) {
        case 'init':
          window.chromeContentConfig = Object.assign({}, data);
          break;
        // todo
        default: break;
      }
    });

    // auto reload extension when save
    if (process.env.NODE_ENV !== 'production') {
      onExtensionReload(process.env.PORT);
    }
  },
  render() {
    ReactDOM.render(<App />, document.getElementById(this.contentId));
  },
}

content.run();
