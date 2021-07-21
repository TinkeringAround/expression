import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import GridSidepane from './index';

import { AppMock } from '../../../mock/components';

describe('GridSidepane', () => {
  const GridSidepaneInApp = (text: string) => (
    <AppMock>
      <GridSidepane>{text}</GridSidepane>
    </AppMock>
  );

  test('should render children', () => {
    const text = 'text';

    render(GridSidepaneInApp(text));

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
