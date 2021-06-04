import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { updateSlicerSelectionRecipe } from '../../../../store/slicer/reducer';
import { updateSlicerSelection } from '../../../../store/slicer/actions';
import { useSlicer } from '../../../../store/slicer';

import Drawing from './index';

import { AppMock } from '../../../../mock/components';
import { mockProperties, unMockProperties } from '../../../../mock/html';
import { mockUseClientRect } from '../../../../mock/hook';
import { getSlicerStoreMock } from '../../../../mock/store';
import { mockElectronTrigger } from '../../../../mock/electron';

describe('Drawing', () => {
  const width = 500;

  const DrawingInApp = (
    <AppMock>
      <Drawing />
    </AppMock>
  );

  beforeAll(() => {
    mockProperties('HTML', ['clientWidth', 'scrollWidth'], [500, 1000]);
  });

  afterAll(() => {
    unMockProperties('HTML');
  });

  beforeEach(() => {
    mockUseClientRect({ width });
    useSlicer.setState(getSlicerStoreMock());
    mockElectronTrigger(updateSlicerSelectionRecipe);
  });

  test('should render audio and timeline', () => {
    render(DrawingInApp);

    const roles = ['audio', 'channel', 'timeline'];
    roles.forEach(role => expect(screen.getByRole(role)).toBeInTheDocument());
  });

  test('should draw audio channel data', () => {
    render(DrawingInApp);

    const channel = screen.getByRole('channel');
    expect(channel).toHaveAttribute('points');

    const points = channel.getAttribute('points');
    const { samples } = useSlicer.getState();

    expect(points?.length).toBeGreaterThan(0);
    // ignore first ' ' blank and then compare to sample count
    expect(points?.slice(1, points?.length).split(' ').length).toEqual(samples);
  });

  test('should adjust svg width according to zoom', async () => {
    const zoom = 5;
    updateSlicerSelection({ zoom });
    render(DrawingInApp);

    expect(screen.getByRole('audio')).toHaveStyle(`width: ${zoom * 100}%`);
  });

  test('should update offset when scrolled', async () => {
    const zoom = 5,
      scrollLeft = 100;
    updateSlicerSelection({ zoom });

    render(DrawingInApp);

    fireEvent.scroll(screen.getByRole('drawing'), { target: { scrollLeft } });

    const duration = useSlicer.getState().file?.buffer.duration ?? 0;
    expect(duration).not.toBe(0);
    expect(useSlicer.getState().selection.offset).toBe((scrollLeft / (width * zoom)) * duration);
  });

  describe('with baseWidth is UNDEFINED (=1)', () => {
    beforeEach(() => {
      mockUseClientRect({ width: 1 });
      useSlicer.setState(getSlicerStoreMock());
      mockElectronTrigger(updateSlicerSelectionRecipe);
    });

    test('should draw audio channel data', () => {
      render(DrawingInApp);

      const channel = screen.getByRole('channel');
      const points = channel.getAttribute('points');

      expect(points).toBe('');
    });
  });
});
