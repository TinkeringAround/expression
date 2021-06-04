import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Timeline from './index';

import { AppMock } from '../../../../../mock/components';

describe('Timeline', () => {
  const TimelineInApp = (duration: number = 100, zoom: number = 1) => (
    <AppMock>
      <Timeline duration={duration} zoom={zoom} height={500} width={1000} />
    </AppMock>
  );

  test('should render baseline, step, lines', () => {
    render(TimelineInApp());

    const roles = ['baseline', 'step', 'line'];
    roles.forEach(role => expect(screen.getByRole(role)).toBeInTheDocument());
  });

  test('should render text according to duration and zoom', () => {
    const duration = 100;
    const zoomLevels = [1, 2, 6, 12, 25];
    const expectedTextCount = [10, 20, 50, 100, 200];

    const { rerender } = render(TimelineInApp(100, 1));

    zoomLevels.forEach((zoom, index) => {
      rerender(TimelineInApp(duration, zoom));
      expect(document.querySelectorAll('text').length).toEqual(expectedTextCount[index]);
    });
  });
});
