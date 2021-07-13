import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../../../store/slicer';

import Loading from './index';

import { AppMock } from '../../../../mock/components';
import { getSlicerStoreMock } from '../../../../mock/store';

describe('Loading', () => {
  const LoadingInApp = (
    <AppMock>
      <Loading />
    </AppMock>
  );

  beforeEach(() => {
    useSlicer.setState(getSlicerStoreMock());
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should not be shown when isProcessing is false', () => {
    render(LoadingInApp);

    const loading = screen.getByRole('loading');

    expect(loading).toBeInTheDocument();
    expect(loading).toHaveStyle('opacity: 0');
  });

  test('should be shown when isProcessing is true', () => {
    useSlicer.setState(getSlicerStoreMock({ progress: 50 }));
    render(LoadingInApp);

    const loading = screen.getByRole('loading');

    expect(loading).toHaveStyle('opacity: 1');
  });

  test('should delay when isProcessing switch to false', () => {
    useSlicer.setState(getSlicerStoreMock({ progress: 50 }));
    render(LoadingInApp);

    act(() => {
      useSlicer.setState(getSlicerStoreMock({ progress: 100 }));
    });

    const loading = screen.getByRole('loading');
    expect(loading).toHaveStyle('opacity: 1');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(loading).toHaveStyle('opacity: 0');
  });
});
