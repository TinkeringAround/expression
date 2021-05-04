import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Global Styles
import './index.scss';

// Features
import Dashboard from './feature/dashboard';

// ==========================================================
ReactDOM.render(<Dashboard />, document.getElementById('root'));
serviceWorker.unregister();
