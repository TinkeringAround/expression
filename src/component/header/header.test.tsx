import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Features } from '../../features';
import { getFeatureNameByPath } from '../../util';

import Header from './index';

import { mockRouterLocation } from '../../mock/router';
import { AppMock } from '../../mock/components';

describe('Dashboard', () => {
  const headerWithRouter = (
    <AppMock>
      <Header />
    </AppMock>
  );

  test('should render logo', () => {
    mockRouterLocation(Features.DASHBOARD);
    render(headerWithRouter);

    expect(screen.getByText(getFeatureNameByPath(Features.DASHBOARD))).toBeTruthy();
  });

  test('should display all features as converted names', () => {
    const features = [Features.DASHBOARD, Features.FX, Features.SLICER, Features.PHRASER];

    features.forEach(feature => {
      mockRouterLocation(feature);
      render(headerWithRouter);
      expect(screen.getByText(getFeatureNameByPath(feature))).toBeInTheDocument();
    });
  });
});
