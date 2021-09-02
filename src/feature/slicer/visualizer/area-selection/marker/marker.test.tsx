import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AppMock } from '../../../../../mock/components';

import { useSlicer } from '../../../../../store/slicer';

import Marker from './index';

import { getSlicerStoreMock } from '../../../../../mock/slicer';
import Transport from '../../../../../mock/transport';

describe('marker', () => {
  const progress = 0.5;
  const MarkerInApp = (
    <AppMock>
      <Marker />
    </AppMock>
  );

  beforeEach(() => {
    useSlicer.setState(getSlicerStoreMock());
    Transport.progress = 0;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should update position when Transport is started', () => {
    jest.useFakeTimers();

    render(MarkerInApp);
    Transport.start();
    Transport.progress = progress;
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByRole('marker')).toHaveStyle(`left: ${progress * 100}%`);
  });

  test('should update position and clear timeout handler when Transport is paused', async () => {
    render(MarkerInApp);
    Transport.start();

    // check if not updated via start handler yet
    expect(screen.getByRole('marker')).toHaveStyle(`left: 0%`);

    Transport.progress = progress;
    act(() => Transport.pause());

    expect(screen.getByRole('marker')).toHaveStyle(`left: ${progress * 100}%`);
  });

  test('should update position when Transport emits loopStart', async () => {
    render(MarkerInApp);

    Transport.progress = progress;
    act(() => Transport.triggerLoopStart());

    expect(screen.getByRole('marker')).toHaveStyle(`left: ${progress * 100}%`);
  });

  test('should update position when Transport emits loopEnd', async () => {
    render(MarkerInApp);

    Transport.progress = progress;
    act(() => Transport.triggerLoopEnd());

    expect(screen.getByRole('marker')).toHaveStyle(`left: ${progress * 100}%`);
  });

  test('should cap position to 100', async () => {
    Transport.progress = 5;
    render(MarkerInApp);

    expect(screen.getByRole('marker')).toHaveStyle(`left: 100%`);
  });

  test('should floor position to 0', async () => {
    Transport.progress = -5;
    render(MarkerInApp);

    expect(screen.getByRole('marker')).toHaveStyle(`left: 0%`);
  });
});
