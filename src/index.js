import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './utils/registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import './static/fonts/fonts.css';
import App from './components/App/App.js';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
