import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { theme } from '../../theme';

import Tag from './index';

describe('Tag', () => {
  test('should render and apply styles', () => {
    render(<Tag>Tag-Test</Tag>);

    const tag = screen.getByText('Tag-Test');

    expect(tag).toBeInTheDocument();
    expect(tag).toHaveStyle(`background: ${theme.hexToRgb(theme.light)}`);
    expect(tag).toHaveStyle(`color: ${theme.hexToRgb(theme.black)}`);
  });
});
