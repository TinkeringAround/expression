import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Features } from '../../features';
import { featureToNameByPath } from '../../lib/util';

import Header from './index';

import { mockRouterLocation } from '../../mock/router';
import { AppMock } from '../../mock/components';

describe('Header', () => {
  const HeaderInApp = (
    <AppMock>
      <Header />
    </AppMock>
  );

  test('should render logo', () => {
    mockRouterLocation(Features.DASHBOARD);
    render(HeaderInApp);

    expect(screen.getByText(featureToNameByPath(Features.DASHBOARD))).toBeTruthy();
  });

  test('should not render controls on dashboard', () => {
    mockRouterLocation(Features.DASHBOARD);
    render(HeaderInApp);

    expect(screen.queryAllByRole('button').length).toBe(0);
  });

  test('should render slicer controls', () => {
    mockRouterLocation(Features.SLICER);
    render(HeaderInApp);

    expect(screen.queryAllByRole('button').length).toBeGreaterThan(0);
  });

  test('should display all features as converted names', () => {
    const features = [Features.DASHBOARD, Features.FX, Features.SLICER, Features.PHRASER];

    features.forEach(feature => {
      mockRouterLocation(feature);
      render(HeaderInApp);
      expect(screen.getByText(featureToNameByPath(feature))).toBeInTheDocument();
    });
  });
});
