import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Drawing from './index';

import { AppMock } from '../../../../mock/components';
import { mockProperties, unMockProperties } from '../../../../mock/html';
import { getChannelDataMock } from '../../../../mock/audio';
import { mockUseClientRect } from '../../../../mock/hook';

describe('Drawing', () => {
  const width = 500;
  const samples = 10;
  const channelData = [getChannelDataMock(100), getChannelDataMock(100)];
  let updateOffset = jest.fn();

  const DrawingInApp = (zoom = 1) => (
    <AppMock>
      <Drawing
        channelData={channelData}
        zoom={zoom}
        samples={samples}
        updateOffset={updateOffset}
      />
    </AppMock>
  );

  beforeAll(() => {
    mockProperties('HTML', ['clientWidth', 'scrollWidth'], [500, 1000]);
  });

  afterAll(() => {
    unMockProperties('HTML');
  });

  beforeEach(() => {
    updateOffset = jest.fn();
    mockUseClientRect({ width });
  });

  test('should draw channel data', () => {
    render(DrawingInApp());

    const polyLine = document.querySelector('polyline');
    expect(polyLine).toBeInTheDocument();
    expect(polyLine).toHaveAttribute('points');

    const points = polyLine?.getAttribute('points');
    expect(points).not.toEqual('');
    expect(points?.length).toBeGreaterThan(0);
    // ignore first ' ' blank and then compare to sample count
    expect(points?.slice(1, points?.length).split(' ').length).toEqual(samples);
  });

  test('should adjust svg width according to zoom', () => {
    const zoom = 5;
    render(DrawingInApp(zoom));

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveStyle(`width: ${zoom * 100}%`);
  });

  test('should update offset when scrolled', async () => {
    const zoom = 5,
      scrollLeft = 100;
    render(DrawingInApp(zoom));

    fireEvent.scroll(screen.getByRole('drawing'), { target: { scrollLeft } });

    expect(updateOffset).toHaveBeenCalledWith(scrollLeft / (width * zoom));
  });
});
