import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';

// Global Styles
import './index.scss';
import { theme } from './theme';

// Features
import Dashboard from './feature/dashboard';

// ==========================================================
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Redirect to="/dashboard" />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
