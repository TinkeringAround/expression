import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../store/slicer';

import Slicer from '.';

import { AppMock } from '../../mock/components';
import { getSlicerStoreMock } from '../../mock/slicer';
import { mockUseClientRect, mockUseDrag } from '../../mock/hook';

describe('Slicer', () => {
  const SlicerInApp = (
    <AppMock>
      <Slicer />
    </AppMock>
  );

  beforeEach(() => {
    useSlicer.setState(getSlicerStoreMock());
    mockUseDrag();
    mockUseClientRect({});
  });

  test('should render info and visualization section when selected File is not null', () => {
    const { file } = useSlicer.getState();
    render(SlicerInApp);

    const sections = document.querySelectorAll('section');
    expect(file).not.toBeNull();
    expect(sections.length).toBe(2);
  });

  test('should render hint when file is null', () => {
    useSlicer.setState(getSlicerStoreMock({ file: null }));
    render(SlicerInApp);

    expect(screen.getByText(/Select/)).toBeInTheDocument();
  });

  test('should render tabs', () => {
    const tabs = ['Export', 'Notifications'];

    render(SlicerInApp);

    expect(document.querySelector('aside')).toBeInTheDocument();
    tabs.forEach(tab => expect(screen.queryAllByText(tab).length).toBeGreaterThan(0));
  });
});
