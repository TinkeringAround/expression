import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useClientRect } from './useClientRect';
import { useRefCallback } from './useRefCallback';

import { mockResizeObserver } from '../mock/html';

describe('useClientRect', () => {
  const UseClientRect: FC = () => {
    const { ref, setRef } = useRefCallback();
    const { rect } = useClientRect(ref);

    return (
      <div ref={setRef}>
        <span>{rect?.width}</span>
        <span>{rect?.height}</span>
      </div>
    );
  };

  test('should set up resize observer correctly', async () => {
    const { observe } = mockResizeObserver();
    render(<UseClientRect />);

    expect(observe).toHaveBeenCalled();
  });
});
