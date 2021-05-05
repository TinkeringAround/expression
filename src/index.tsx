import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';

// Global Styles
import './index.scss';
import { theme } from './theme';

// Features
import Dashboard from './feature/dashboard';

// ==========================================================
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Dashboard />
  </ThemeProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
