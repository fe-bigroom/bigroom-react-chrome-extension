import defaultConfig from './default.config';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const config = require(`./${env}.config.js`).default; // eslint-disable-line

export default Object.assign(defaultConfig, config);
