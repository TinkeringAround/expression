import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
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

  test('should render all control buttons', () => {
    render(ChangesInApp);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  test('should render all changes when selectedSong is not null', () => {
    const songChangeMock = getSongChangeMock();
    usePhraser.setState(
      getPhraserMock({
        selectedSong: getSongMock({ changes: [songChangeMock] })
      })
    );

    render(ChangesInApp);

    expect(screen.getByText(songChangeMock.date)).toBeInTheDocument();
  });

  test('should expand all changes when selectedSong is not null and click on date', () => {
    const songChangeMock = getSongChangeMock();
    usePhraser.setState(
      getPhraserMock({
        selectedSong: getSongMock({ changes: [songChangeMock] })
      })
    );

    render(ChangesInApp);

    act(() => {
      fireEvent.click(screen.getByText(songChangeMock.date));
    });

    expect(screen.getByText(songChangeMock.kind.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(songChangeMock.action)).toBeInTheDocument();
  });

  test('should expand all changes when selectedSong is not null and click on expand button', () => {
    const songChangeMock = getSongChangeMock();
    usePhraser.setState(
      getPhraserMock({
        selectedSong: getSongMock({ changes: [songChangeMock] })
      })
    );

    render(ChangesInApp);

    act(() => {
      fireEvent.click(screen.getAllByRole('button')[1]);
    });

    expect(screen.getByText(songChangeMock.kind.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(songChangeMock.action)).toBeInTheDocument();
  });

  test('should collapse all changes when selectedSong is not null and click on collapse button', () => {
    const songChangeMock = getSongChangeMock();
    usePhraser.setState(
      getPhraserMock({
        selectedSong: getSongMock({ changes: [songChangeMock] })
      })
    );

    render(ChangesInApp);

    act(() => {
      fireEvent.click(screen.getAllByRole('button')[1]);
    });

    act(() => {
      fireEvent.click(screen.getAllByRole('button')[0]);
    });

    expect(screen.getByText(songChangeMock.date)).toBeInTheDocument();
    expect(screen.queryByText(songChangeMock.kind.toUpperCase())).not.toBeInTheDocument();
    expect(screen.queryByText(songChangeMock.action)).not.toBeInTheDocument();
  });
});
