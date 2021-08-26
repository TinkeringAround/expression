import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import GridSidepane from './index';

import { AppMock } from '../../../mock/components';

describe('GridSidepane', () => {
  const text = 'text';
  const GridSidepaneInApp = (text: string) => (
    <AppMock>
      <GridSidepane>{text}</GridSidepane>
    </AppMock>
  );

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should render children and toggle icon', () => {
    render(GridSidepaneInApp(text));

    const toggleIcon = document.querySelector('.icon');

    expect(toggleIcon).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test('should collapse sidepane when clicked on collapse icon', () => {
    render(GridSidepaneInApp(text));

    const toggleIcon = document.querySelector('.icon');

    if (toggleIcon) {
      act(() => {
        fireEvent.click(toggleIcon);
      });
      jest.advanceTimersByTime(500);
    }

    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });
});
