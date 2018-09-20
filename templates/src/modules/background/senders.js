
import config from '../../commons/config';
import constants from '../../commons/constants';

const initContent = () => {
  chrome.tabs.getSelected(null, (tab) => {
    const data = {
      action: 'init',
      data: {
        config,
        constants,
        env: process.env.NODE_ENV, // default development
        port: process.env.PORT, // default 3000
      },
    };
    chrome.tabs.sendMessage(tab.id, data, () => console.log('background inits content, done!'));
  });
};

export {
  initContent,
};
