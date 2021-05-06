import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import { Routes } from './routes';
import './index.scss';
import { theme } from './theme';

// Features
import Dashboard from './feature/dashboard';
import Header from './component/header';
import Content from './component/content';

// ==========================================================
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Header />
      <Content>
        <Switch>
          <Route path={Routes.DASHBOARD}>
            <Dashboard />
          </Route>
          <Redirect to={Routes.DASHBOARD} />
        </Switch>
      </Content>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
