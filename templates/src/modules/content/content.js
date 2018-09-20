import React from 'react';
import ReactDOM from 'react-dom';

import { injectRootDom, onMessage, sendMessage } from './util';
import App from './App';

const contentId = 'chrome-content-root';

onMessage(({ action, data }, sender, response) => { // eslint-disable-line
  switch (action) {
    case 'init':
      window.chromeContentConfig = Object.assign({}, data);
      break;

    default: break;
  }
});

sendMessage('init');
injectRootDom(contentId);

ReactDOM.render(<App />, document.getElementById(contentId));
