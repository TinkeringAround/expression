import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import GridContent from './index';

import { AppMock } from '../../../mock/components';

describe('GridContent', () => {
  const GridContentInApp = (text: string) => (
    <AppMock>
      <GridContent>{text}</GridContent>
    </AppMock>
  );

  test('should render children', () => {
    const text = 'text';

    render(GridContentInApp(text));

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
