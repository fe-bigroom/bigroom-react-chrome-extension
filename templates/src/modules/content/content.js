import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

console.log('content injected done!');
ReactDOM.render(<App />, document.getElementById('chrome-content-root'))
