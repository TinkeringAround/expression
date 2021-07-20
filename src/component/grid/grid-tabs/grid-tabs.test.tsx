import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { GridTabs } from '../index';

import { AppMock } from '../../../mock/components';

describe('GridTabs', () => {
  const GridTabsInApp = (initialTab = -1) => (
    <AppMock>
      <GridTabs
        tabs={[{ name: 'Tab', component: <span>Component</span> }]}
        initialTab={initialTab}
      />
    </AppMock>
  );

  test('should only render Tab names when no initial Tab value is set', () => {
    render(GridTabsInApp());

    expect(screen.getByText('Tab')).toBeInTheDocument();
    expect(screen.queryByText('Component')).not.toBeInTheDocument();
  });

  test('should only render Tab names when no initial Tab value is provided', () => {
    render(
      <AppMock>
        <GridTabs tabs={[{ name: 'Tab', component: <span>Component</span> }]} />
      </AppMock>
    );

    expect(screen.getByText('Tab')).toBeInTheDocument();
    expect(screen.queryByText('Component')).not.toBeInTheDocument();
  });

  test('should render Tab component when initial Tab is set', () => {
    render(GridTabsInApp(0));

    expect(screen.getByText('Component')).toBeInTheDocument();
  });

  test('should show tab component when not expanded and tab clicked', () => {
    render(GridTabsInApp());

    fireEvent.click(screen.getByText('Tab'));

    expect(screen.getByText('Component')).toBeInTheDocument();
  });

  test('should hide tab component when not expanded and tab clicked twice', async () => {
    render(GridTabsInApp());

    fireEvent.click(screen.getByText('Tab'));
    fireEvent.click(screen.getByText('Tab'));

    await waitFor(() => expect(screen.queryByText('Component')).not.toBeInTheDocument());
  });
});
