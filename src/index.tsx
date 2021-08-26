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
import Phraser from './feature/phraser';

// Store
import './store';
import { loadPhraser, updatePhraser } from './store/phraser/actions';

// ==========================================================
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Header />
      <Content>
        <Switch>
          <Route path={Features.DASHBOARD}>
            <Dashboard />
          </Route>
          <Route path={Features.SLICER}>
            <Slicer />
          </Route>
          <Route path={Features.PHRASER}>
            <Phraser />
          </Route>
          <Redirect to={Features.DASHBOARD} />
        </Switch>
      </Content>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();

// ==========================================================
window.addEventListener('load', () => loadPhraser());
window.addEventListener('beforeunload', () => updatePhraser());
