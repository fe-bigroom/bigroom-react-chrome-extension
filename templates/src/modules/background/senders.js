
import config from '../../commons/config';
import constants from '../../commons/constants';

const initContent = () => {
  console.log(process.env.NODE_ENV)
  chrome.tabs.getSelected(null, (tab) => {
    const data = {
      action: 'init',
      data: {
        config,
        constants,
        env: process.env.NODE_ENV, // default development
        port: process.env.PORT, // default 3000
        publicPath: process.env.PUBLIC_PATH, // default js/
      },
    };
    chrome.tabs.sendMessage(tab.id, data, () => console.log('background inits content, done!'));
  });
};

export {
  initContent,
};
