import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Icon from './index';

describe('Icon', () => {
  test('should render icon when icon type is provided', () => {
    render(<Icon iconType="play" />);

    const icon = document.querySelector('span');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('icon-play');
  });

  test('should not render when icon type is not provided', () => {
    render(<Icon iconType={null} />);

    const icon = document.querySelector('span');
    expect(icon).not.toBeInTheDocument();
  });
});
