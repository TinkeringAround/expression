import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import If from './index';

describe('if', () => {
  test('should render children if condition is true', () => {
    render(<If condition={true}>Test</If>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('should not render children if condition is false', () => {
    render(<If condition={false}>Test</If>);

    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });
});
