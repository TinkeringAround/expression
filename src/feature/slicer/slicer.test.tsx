import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useStore } from '../../store';
import { removeAudioFileTypeFromName } from '../../audio';
import { bytesToMegaBytes } from '../../util';

import Slicer from '.';

import { AppMock } from '../../mock/components';
import { getMockStore } from '../../mock/store';
import { mockUseDrag } from '../../mock/hook';

describe('Slicer', () => {
  const SlicerInApp = (
    <AppMock>
      <Slicer />
    </AppMock>
  );

  beforeEach(() => {
    useStore.setState(getMockStore());
    mockUseDrag();
  });

  test('should render info and visualization section when selected File is not null', () => {
    const { file } = useStore.getState().slicer;
    render(SlicerInApp);

    const sections = document.querySelectorAll('section');
    expect(file).not.toBeNull();
    expect(sections.length).toBe(2);
  });

  test('should display audio file info when audio file is not null', () => {
    const { file } = useStore.getState().slicer;
    render(SlicerInApp);

    if (file) {
      const fileNameWithoutType = removeAudioFileTypeFromName(file.name);
      const convertedSize = bytesToMegaBytes(file.size);
      // name is twice in dom -> in drop zone and info
      expect(screen.getAllByText(fileNameWithoutType).length).toBe(2);
      expect(screen.getByText(convertedSize)).toBeInTheDocument();
    }
  });
});
