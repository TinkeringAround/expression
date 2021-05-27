import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AreaSelection from './index';

import { AppMock } from '../../../../mock/components';
import { mockUseDrag } from '../../../../mock/hook';

describe('AreaSelection', () => {
  const duration = 100,
    size = 10000,
    zoom = 1,
    updateSelection = jest.fn();

  const AreaSelectionMock = (
    <AppMock>
      <AreaSelection
        duration={duration}
        size={size}
        zoom={zoom}
        offset={0}
        updateSelection={updateSelection}
      />
    </AppMock>
  );

  beforeEach(() => {
    mockUseDrag();
  });

  test('should display both borders and selection area', async () => {
    render(AreaSelectionMock);

    expect(screen.getByRole('border-left')).toBeInTheDocument();
    expect(screen.getByRole('border-right')).toBeInTheDocument();
    expect(screen.getByRole('area')).toBeInTheDocument();
  });

  test('should display selection area with sliced duration', async () => {
    render(AreaSelectionMock);

    // search for MB used to display estimated file size after slice
    // which only get used by area selection
    expect(screen.getByText(/MB/)).toBeInTheDocument();
  });

  describe('with right border is below area threshold', () => {
    beforeEach(() => {
      mockUseDrag(10);
    });

    test('should not display sliced duration when are selection width is below threshold', async () => {
      render(AreaSelectionMock);

      // search for MB used to display estimated file size after slice
      // which only get used by area selection
      expect(screen.queryByText(/MB/)).not.toBeInTheDocument();
    });
  });
});
