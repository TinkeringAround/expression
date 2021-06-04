import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import * as serviceWorker from './serviceWorker';
import { Features } from './features';
import { theme } from './theme';
import './index.scss';

// Components
import Dashboard from './feature/dashboard';
import Header from './component/header';
import Content from './component/content';
import Slicer from './feature/slicer';
import Notifications from './component/notifications';

// Store
import './store';

// ==========================================================
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Notifications />
      <Header />
      <Content>
        <Switch>
          <Route path={Features.DASHBOARD}>
            <Dashboard />
          </Route>
          <Route path={Features.SLICER}>
            <Slicer />
          </Route>
          <Redirect to={Features.DASHBOARD} />
        </Switch>
      </Content>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
