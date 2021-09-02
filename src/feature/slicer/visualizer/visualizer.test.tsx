import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../../store/slicer';
import { updateSlicerSelectionRecipe } from '../../../store/slicer/reducer';
import { BORDER_WIDTH } from './area-selection';

import Visualizer from './index';

import { AppMock } from '../../../mock/components';
import { mockUseClientRect, mockUseDrag } from '../../../mock/hook';
import { getSlicerStoreMock } from '../../../mock/slicer';
import { mockElectronTrigger } from '../../../mock/electron';

describe('Visualizer', () => {
  const initialEnd = 0,
    width = 100;
  const VisualizerInApp = (
    <AppMock>
      <Visualizer />
    </AppMock>
  );

  beforeEach(() => {
    useSlicer.setState(getSlicerStoreMock());
    mockUseDrag(initialEnd);
    mockUseClientRect({ width });
  });

  test('should render controls, drawing and loading', () => {
    render(VisualizerInApp);

    expect(screen.getByRole('area')).toBeInTheDocument();
    expect(screen.getAllByRole(/border/).length).toEqual(2);
    expect(document.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByRole('loading')).toBeInTheDocument();
  });

  test('should update start and end when area selection border position update', () => {
    mockElectronTrigger(updateSlicerSelectionRecipe);
    render(VisualizerInApp);

    // test initial update of border right and update in store
    expect(useSlicer.getState().selection.end).toBeGreaterThan(BORDER_WIDTH);
  });

  describe('with disabled useDragMock', () => {
    beforeEach(() => {
      useSlicer.setState(getSlicerStoreMock());
      mockUseDrag(0);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('should update zoom in store when zoomed', async () => {
      mockElectronTrigger(updateSlicerSelectionRecipe);
      render(VisualizerInApp);

      act(() => {
        fireEvent.wheel(screen.getByRole('visualizer'), { deltaY: 100 });
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => expect(useSlicer.getState().selection.zoom).toBe(2));
    });

    test('should update offset in store when scrolled vertically in drawing', async () => {
      const scrollLeft = 100;

      mockElectronTrigger(updateSlicerSelectionRecipe);
      render(VisualizerInApp);

      act(() => {
        fireEvent.scroll(screen.getByRole('drawing'), { target: { scrollLeft } });
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => {
        const { file, selection } = useSlicer.getState();
        expect(file).not.toBeNull();

        if (file) {
          const expectedOffset = (scrollLeft / (width * selection.zoom)) * file.buffer.duration;
          return expect(useSlicer.getState().selection.offset).toBe(expectedOffset);
        }
      });
    });
  });
});
