import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { theme } from '../../theme';

import Spinner from './index';

import { AppMock } from '../../mock/components';

describe('Spinner', () => {
  const SpinnerInApp = (color?: string) => (
    <AppMock>
      <Spinner color={color} />
    </AppMock>
  );

  test('should render Spinner with default color', () => {
    render(SpinnerInApp());

    const spinner = screen.getByRole('spinner');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle(`color: ${theme.yellow}`);
  });

  test('should render Spinner with red color', () => {
    render(SpinnerInApp('red'));

    const spinner = screen.getByRole('spinner');

    expect(spinner).toHaveStyle(`color: ${theme.red}`);
  });
});
