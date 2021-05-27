import React, { FC } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useZoom } from './useZoom';

describe('useZoom', () => {
  const UseZoom: FC = () => {
    const zoom = useZoom();

    return <div>{zoom}</div>;
  };

  test('should adjust zoom according to mousewheel event', () => {
    render(<UseZoom />);

    const divElement = document.querySelector('div');
    expect(divElement).toBeInTheDocument();

    if (divElement) {
      fireEvent.wheel(divElement, { deltaY: 100 });
      expect(screen.getByText('2')).toBeInTheDocument();
    }
  });

  test('should ignore mousewheel event when zoom is min', () => {
    render(<UseZoom />);

    const divElement = document.querySelector('div');
    expect(divElement).toBeInTheDocument();

    if (divElement) {
      fireEvent.wheel(divElement, { deltaY: -200 });
      expect(screen.getByText('1')).toBeInTheDocument();
    }
  });
});
