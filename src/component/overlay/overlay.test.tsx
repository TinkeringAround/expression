import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AppMock } from '../../mock/components';
import Overlay from './index';

describe('Overlay', () => {
  const OverlayInApp = (visible: boolean = true) => (
    <AppMock>
      <Overlay visible={visible}>Test</Overlay>
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
