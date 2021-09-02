import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { usePhraser } from '../../../store/phraser';

import Changes from './index';

import { AppMock } from '../../../mock/components';
import { getPhraserMock, getSongChangeMock, getSongMock } from '../../../mock/phraser';

describe('Changes', () => {
  const ChangesInApp = (
    <AppMock>
      <Changes />
    </AppMock>
  );

  test('should render all changes when selectedSong is not null', () => {
    const songChangeMock = getSongChangeMock();
    usePhraser.setState(
      getPhraserMock({
        selectedSong: getSongMock({ changes: [songChangeMock] })
      })
    );

    render(ChangesInApp);

    expect(screen.getByText(songChangeMock.kind.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(songChangeMock.action)).toBeInTheDocument();
    expect(screen.getByText(songChangeMock.date)).toBeInTheDocument();
  });
});
