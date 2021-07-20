import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import For from './index';

describe('For', () => {
  test('should render elements when values and projector is provided', () => {
    const values: string[] = ['eins', 'zwei', 'drei'];

    render(<For values={values} projector={value => <span key={value}>{value}</span>} />);

    values.forEach(value => expect(screen.getByText(value)).toBeInTheDocument());
  });
});
