import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../../store/slicer';
import { removeAudioFileTypeFromName } from '../../../lib/audio';
import { toMB } from '../../../lib/util';

import Info from './index';

describe('Info', () => {
  test('should display audio file info when audio file is not null', () => {
    const { file } = useSlicer.getState();
    render(<Info />);

    if (file) {
      const fileNameWithoutType = removeAudioFileTypeFromName(file.name);
      const convertedSize = toMB(file.size);
      // name is twice in dom -> in drop zone and info
      expect(screen.getAllByText(fileNameWithoutType).length).toBe(2);
      expect(screen.getByText(convertedSize)).toBeInTheDocument();
    }
  });
});
