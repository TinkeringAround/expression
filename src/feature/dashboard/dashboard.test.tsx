import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Features } from '../../features';

import Dashboard from '.';

describe('Dashboard', () => {
  const dashBoardWithRouter = (
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  test('loads and displays all Features but "DASHBOARD"', async () => {
    const { getByText } = render(dashBoardWithRouter);

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(getByText('SLICER')).toBeInTheDocument();
    expect(getByText('FX')).toBeInTheDocument();
  });

  test('renders enabled features as links with correct href', async () => {
    const { getByText } = render(dashBoardWithRouter);

    Object.keys(Features)
      .filter(route => route !== 'DASHBOARD')
      .forEach(route => {
        const link = getByText(route) as HTMLLinkElement;

        expect(link.tagName).toEqual('A');
        expect(link.href.includes(route.toLowerCase())).toBeTruthy();
      });
  });
});
