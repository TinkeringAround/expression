import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Dialog from './index';

import { AppMock } from '../../mock/components';

describe('Overlay', () => {
  const OverlayInApp = (visible: boolean = true) => (
    <AppMock>
      <Dialog visible={visible}>Test</Dialog>
    </AppMock>
  );

  test('should display content when visible is true', () => {
    render(OverlayInApp());

    expect(screen.getByText(/Test/)).toBeInTheDocument();
  });

  test('should hide content when visible is toggled from true to false', () => {
    jest.useFakeTimers();
    const { rerender } = render(OverlayInApp());

    rerender(OverlayInApp(false));
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByText(/Test/)).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
