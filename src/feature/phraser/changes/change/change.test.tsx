import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SongChange, SongChangeAction } from '../../../../store/phraser/types';

import Change from './index';

import { AppMock } from '../../../../mock/components';

describe('Change', () => {
  const ChangeInApp = (change: SongChange) => (
    <AppMock>
      <Change change={change} />
    </AppMock>
  );

  test('should render isUpdate when isUpdate is provided', () => {
    const actions: SongChangeAction[] = ['add', 'update', 'remove', 'reorder', 'move'];

    actions.forEach(action => {
      render(
        ChangeInApp({
          date: '01. Jan 1970',
          kind: 'title',
          action,
          snapshot: { title: 'title', parts: [] }
        })
      );

      expect(screen.getByText(action)).toBeInTheDocument();
    });
  });
});
