import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../../store/slicer';

import SlicerControls from './index';

import { AppMock } from '../../../mock/components';
import { getSlicerStoreMock } from '../../../mock/store';

describe('SlicerControls', () => {
  const icons = ['first', 'play', 'stop', 'last', 'save'];
  const SlicerControlsInApp = (
    <AppMock>
      <SlicerControls />
    </AppMock>
  );

  beforeEach(() => {
    useSlicer.setState(getSlicerStoreMock());
  });

  test('should render all slicer relevant icons', () => {
    render(SlicerControlsInApp);

    icons.forEach(icon => {
      expect(document.querySelector(`.icon-${icon}`)).toBeInTheDocument();
    });
  });

  test('should render all slicer relevant buttons', () => {
    render(SlicerControlsInApp);

    screen.getAllByRole('button').forEach(button => {
      // click to trigger onClick -> no expectations yet
      fireEvent.click(button);

      expect(button).toBeInTheDocument();
      expect(button).not.toHaveAttribute('disabled');
    });
  });

  test('should disable all slicer buttons', () => {
    useSlicer.setState(getSlicerStoreMock({ file: null }));
    render(SlicerControlsInApp);

    screen.getAllByRole('button').forEach(button => {
      expect(button).toHaveAttribute('disabled');
    });
  });
});
