import React, { FC } from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useClientRect } from './useClientRect';
import { useRefCallback } from './useRefCallback';

import { mockResizeObserver } from '../mock/html';

describe('useClientRect', () => {
  const UseClientRect: FC<{ ignoreScroll?: boolean }> = ({ ignoreScroll = false }) => {
    const { ref, setRef } = useRefCallback();
    const { rect } = useClientRect(ref, ignoreScroll);

    return (
      <div ref={setRef}>
        <span>{rect?.width}</span>
        <span>{rect?.height}</span>
      </div>
    );
  };

  test('should set up resize observer correctly', () => {
    const { observe } = mockResizeObserver();
    render(<UseClientRect />);

    expect(observe).toHaveBeenCalled();
  });

  test('should tear down resize observer correctly', () => {
    const { disconnect } = mockResizeObserver();
    const { unmount } = render(<UseClientRect />);

    unmount();

    expect(disconnect).toHaveBeenCalled();
  });

  test('should update rect with contentBox values when resize event is triggered with non empty resize observer entries', () => {
    const {
      triggerResizeEventOnce,
      defaults: { height, width }
    } = mockResizeObserver();
    render(<UseClientRect />);

    act(() => triggerResizeEventOnce());

    expect(screen.getByText(width)).toBeInTheDocument();
    expect(screen.getByText(height)).toBeInTheDocument();
  });

  test('should update rect with borderBox values when resize event is triggered with non empty resize observer entries', () => {
    const {
      triggerResizeEventOnce,
      defaults: { blockSize, inlineSize }
    } = mockResizeObserver();
    render(<UseClientRect ignoreScroll />);

    act(() => triggerResizeEventOnce());

    expect(screen.getByText(blockSize)).toBeInTheDocument();
    expect(screen.getByText(inlineSize)).toBeInTheDocument();
  });

  test('should not update rect when resize event is triggered with empty resize observer entries', () => {
    const {
      triggerResizeEventOnce,
      defaults: { height, width }
    } = mockResizeObserver();
    render(<UseClientRect />);

    act(() => triggerResizeEventOnce([]));

    expect(screen.queryByText(width)).not.toBeInTheDocument();
    expect(screen.queryByText(height)).not.toBeInTheDocument();
  });
});
