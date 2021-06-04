import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../../store/slicer';

import Hint from './index';

import { getSlicerStoreMock } from '../../../mock/store';

describe('Hint', () => {
  test('should display upload files hint when files is empty', () => {
    useSlicer.setState(getSlicerStoreMock({ files: [] }));
    expect(useSlicer.getState().files.length).toBe(0);

    render(<Hint />);

    expect(screen.getByText(/Upload/)).toBeInTheDocument();
  });

  test('should display upload files hint when files is empty', () => {
    useSlicer.setState(getSlicerStoreMock({ file: null }));

    render(<Hint />);

    expect(screen.getByText(/Select/)).toBeInTheDocument();
  });
});
