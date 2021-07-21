import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../../store/slicer';

import Export from './index';

import { AppMock } from '../../../mock/components';
import { getSlicerStoreMock } from '../../../mock/store';
import { mockElectronDispatch } from '../../../mock/electron';

describe('Export', () => {
  const ExportInApp = (
    <AppMock>
      <Export />
    </AppMock>
  );

  test('should render title, info and button', () => {
    render(ExportInApp);

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(document.querySelector('p')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should disable button when isPlaying is true', () => {
    useSlicer.setState(getSlicerStoreMock({ isPlaying: true }));

    render(ExportInApp);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('should dispatch exportSlicerFile action when file is not null', () => {
    const exportSlicerFile = jest.fn();
    mockElectronDispatch(exportSlicerFile);
    useSlicer.setState(getSlicerStoreMock());

    render(ExportInApp);
    fireEvent.keyUp(document, { key: 'E', ctrlKey: true });

    expect(exportSlicerFile).toHaveBeenCalled();
  });

  test('should not dispatch exportSlicerFile action when file is null', () => {
    const exportSlicerFile = jest.fn();
    mockElectronDispatch(exportSlicerFile);
    useSlicer.setState(getSlicerStoreMock({ file: null }));

    render(ExportInApp);
    fireEvent.keyUp(document, { key: 'E', ctrlKey: true });

    expect(exportSlicerFile).not.toHaveBeenCalled();
  });
});
