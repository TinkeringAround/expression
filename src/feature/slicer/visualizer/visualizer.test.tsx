import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useStore } from '../../../store';

import Visualizer from './index';

import { AppMock } from '../../../mock/components';
import { mockUseClientRect, mockUseDrag } from '../../../mock/hook';
import { getMockStore } from '../../../mock/store';
import { mockElectronTrigger } from '../../../mock/electron';
import { updateSlicerSelectionRecipe } from '../../../store/reducer';

describe('Visualizer', () => {
  const initialEnd = 0,
    width = 100;
  const VisualizerInApp = () => (
    <AppMock>
      <Visualizer />
    </AppMock>
  );

  beforeEach(() => {
    useStore.setState(getMockStore());
    mockUseDrag(initialEnd);
    mockUseClientRect({ width });
  });

  test('should render controls and drawing', () => {
    render(VisualizerInApp());

    expect(screen.getByRole('area')).toBeInTheDocument();
    expect(screen.getAllByRole(/border/).length).toEqual(2);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  test('should update start and end when area selection border position update', () => {
    mockElectronTrigger(updateSlicerSelectionRecipe);
    render(VisualizerInApp());

    // test initial update of border right and update in store
    expect(useStore.getState().slicer.selection.end).toBe(initialEnd);
  });

  describe('with disabled useDragMock', () => {
    beforeEach(() => {
      useStore.setState(getMockStore());
      mockUseDrag(0);
    });

    test('should update zoom in store when zoomed', () => {
      mockElectronTrigger(updateSlicerSelectionRecipe);
      render(VisualizerInApp());

      fireEvent.wheel(document, { deltaY: 100 });

      expect(useStore.getState().slicer.selection.zoom).toBe(2);
    });

    test('should update offset in store when scrolled vertically in drawing', () => {
      const scrollLeft = 100;

      mockElectronTrigger(updateSlicerSelectionRecipe);
      render(VisualizerInApp());

      fireEvent.scroll(screen.getByRole('drawing'), { target: { scrollLeft } });

      const { file, selection } = useStore.getState().slicer;
      expect(file).not.toBeNull();

      if (file) {
        const expectedOffset = (scrollLeft / (width * selection.zoom)) * file.buffer.duration;
        expect(useStore.getState().slicer.selection.offset).toBe(expectedOffset);
      }
    });
  });
});
