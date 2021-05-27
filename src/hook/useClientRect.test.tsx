import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useClientRect } from './useClientRect';

import { mockProperties, unMockProperties } from '../mock/html';

describe('useClientRect', () => {
  const UseClientRect: FC = () => {
    const { rect, ref } = useClientRect();

    return (
      <div ref={ref}>
        <span>{rect?.width}</span>
        <span>{rect?.height}</span>
      </div>
    );
  };

  beforeEach(() => {
    mockProperties(
      'HTML',
      ['getBoundingClientRect'],
      [
        jest.fn(() => ({
          width: 1000,
          height: 500,
          x: 10,
          y: 10
        }))
      ]
    );
  });

  afterAll(() => {
    unMockProperties('HTML');
  });

  test('should extract correct width and height from referenced html element', async () => {
    render(<UseClientRect />);

    const divElement = document.querySelector('div');
    expect(divElement).toBeInTheDocument();

    if (divElement) {
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
    }
  });
});
