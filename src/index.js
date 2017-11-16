import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './utils/registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import './index.css';
import './static/fonts/fonts.css';
import App from './components/App/App.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
