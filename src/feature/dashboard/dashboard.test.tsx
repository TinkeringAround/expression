import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Features } from '../../features';

import Dashboard from '.';

import { AppMock } from '../../mock/components';

describe('Dashboard', () => {
  const DashboardInApp = (
    <AppMock>
      <Dashboard />
    </AppMock>
  );

  test('loads and displays all Features but "DASHBOARD"', async () => {
    render(DashboardInApp);

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.getByText('SLICER')).toBeInTheDocument();
  });

  test('renders enabled features as links with correct href', async () => {
    render(DashboardInApp);

    Object.keys(Features)
      .splice(1, 1)
      .forEach(route => {
        const link = screen.getByText(route) as HTMLLinkElement;

        expect(link.tagName).toEqual('A');
        expect(link.href.includes(route.toLowerCase())).toBeTruthy();
      });
  });
});
