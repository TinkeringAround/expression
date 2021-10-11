import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Input from './index';

import { AppMock } from '../../mock/components';

describe('Input', () => {
  test('it should render the input and apply props', () => {
    render(<AppMock><Input value='Test' readOnly /></AppMock>);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', 'Test');
    expect(input).toHaveAttribute('readOnly', '');
  });
});
