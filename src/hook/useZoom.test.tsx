import React, { FC } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useZoom } from './useZoom';
import { useRefCallback } from './useRefCallback';

describe('useZoom', () => {
  const UseZoom: FC = () => {
    const { ref, setRef } = useRefCallback();
    const { zoom } = useZoom(ref);

    return (
      <div ref={setRef} role="wrapper">
        {zoom}
      </div>
    );
  };

  test('should adjust zoom according to mousewheel event', () => {
    render(<UseZoom />);

    fireEvent.wheel(screen.getByRole('wrapper'), { deltaY: 100 });

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('should ignore mousewheel event when zoom is min', () => {
    render(<UseZoom />);

    fireEvent.wheel(screen.getByRole('wrapper'), { deltaY: -200 });

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
