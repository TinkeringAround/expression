import React from 'react';
import { render } from '@testing-library/react';
import routeData from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { mockLocation } from '../../mock/router';

import Header from './index';
import { Features } from '../../features';

describe('Dashboard', () => {
  const headerWithRouter = (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  beforeEach(() => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation());
  });

  test('should render logo', () => {
    const { getByText } = render(headerWithRouter);

    expect(getByText('Dashboard')).toBeTruthy();
  });

  test('should render path as current selected feature', () => {
    const { getByText } = render(headerWithRouter);

    expect(getByText('Dashboard')).toBeTruthy();
  });

  test('should display "FX" as current selected feature when on /fx', () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation(Features.FX));
    const { getByText } = render(headerWithRouter);

    expect(getByText('FX')).toBeTruthy();
  });

  test('should display "Slicer" as current selected feature when on /slicer', () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation(Features.SLICER));
    const { getByText } = render(headerWithRouter);

    expect(getByText('Slicer')).toBeTruthy();
  });
});
