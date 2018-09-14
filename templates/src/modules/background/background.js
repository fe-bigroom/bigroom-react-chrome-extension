import { initContent } from './senders';

const { chrome } = window;

const backgroundjs = {
  sendMessage(action, callback) {
    chrome.runtime.sendMessage({ action }, (data, sender, response) => {
      callback(data, sender, response);
    });
  },

  onMessage(callback) {
    chrome.runtime.onMessage.addListener((data, sender, response) => {
      callback(data, sender, response);
    });
  },

  popupSaveCookie(data) {
    chrome.tabs.getSelected(null, (tab) => {
      chrome.tabs.sendMessage(tab.id, { action: 'bg_save_cookie', data }, () => {});
    });
  },

  listenContent({ action, data }, sender, response) { // eslint-disable-line
    switch (action) {
      case 'init': initContent(); break;
      default: break;
    }
  },

  listenPopup({ action, data }, sender, response) { // eslint-disable-line
    switch (action) {
      default: break;
    }
  },

  listen() {
    this.onMessage(({ _from, action, data }, sender, response) => {
      const params = [{ action, data }, sender, response];

      if (_from === 'content') {
        this.listenContent(...params);
      } else if (_from === 'popup') {
        this.listenPopup(...params);
      }
    });
    return this;
  },

  run() {
    // todo
  },
};

backgroundjs.listen().run();
