import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../../../store/slicer';

import AreaSelection from './index';

import { AppMock } from '../../../../mock/components';
import { mockUseClientRect, mockUseDrag } from '../../../../mock/hook';
import { getSlicerStoreMock } from '../../../../mock/store';

describe('AreaSelection', () => {
  const AreaSelectionMock = (
    <AppMock>
      <AreaSelection />
    </AppMock>
  );

  beforeEach(() => {
    mockUseDrag();
    mockUseClientRect({});
    useSlicer.setState(getSlicerStoreMock());
  });

  test('should display both borders, selection area and marker', async () => {
    render(AreaSelectionMock);

    expect(screen.getByRole('border-left')).toBeInTheDocument();
    expect(screen.getByRole('border-right')).toBeInTheDocument();
    expect(screen.getByRole('area')).toBeInTheDocument();
    expect(screen.getByRole('marker')).toBeInTheDocument();
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
