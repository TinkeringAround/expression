import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { usePhraser } from '../../../store/phraser';
import {
  addPhraserSongPartRecipe,
  deletePhraserCollectionSongRecipe,
  updatePhraserSongTitleRecipe
} from '../../../store/phraser/reducer';

import Parts from './index';

import { AppMock } from '../../../mock/components';
import { getPhraserMock } from '../../../mock/store';
import { getSongMock } from '../../../mock/collection';
import { mockElectronTrigger } from '../../../mock/electron';

describe('Parts', () => {
  const PartsInApp = (
    <AppMock>
      <DragDropContext onDragEnd={() => {}}>
        <Parts />
      </DragDropContext>
    </AppMock>
  );

  const initialPhraseState = getPhraserMock();

  beforeEach(() => {
    usePhraser.setState(initialPhraseState);
  });

  test('should render only footer when selected song is null', () => {
    render(PartsInApp);

    expect(screen.getByText('Add Part')).toBeInTheDocument();
  });

  test('should render song title and add part footer', () => {
    const song = getSongMock();
    usePhraser.setState(getPhraserMock({ selectedSong: { ...song, changes: [] } }));

    render(PartsInApp);

    expect(screen.getByTitle(song.title)).toBeInTheDocument();
    expect(screen.getByText('Add Part')).toBeInTheDocument();

    song.parts.forEach(part => {
      expect(screen.getByTitle(part.name)).toBeInTheDocument();
    });
  });

  test('should add song part when clicked on add part button', () => {
    const song = getSongMock({ parts: [] });

    mockElectronTrigger(addPhraserSongPartRecipe);
    usePhraser.setState(getPhraserMock({ selectedSong: { ...song, changes: [] } }));

    render(PartsInApp);

    act(() => {
      fireEvent.click(screen.getByText('Add Part'));
    });

    expect(screen.getByTitle('UNTITLED')).toBeInTheDocument();
  });

  test('should change song title when song title is changed', async () => {
    const newTitle = 'new-title';
    const song = getSongMock({ title: 'title' });

    mockElectronTrigger(updatePhraserSongTitleRecipe);
    usePhraser.setState(getPhraserMock({ selectedSong: { ...song, changes: [] } }));

    render(PartsInApp);

    act(() => {
      fireEvent.change(screen.getByTitle(song.title), { target: { value: newTitle } });
    });

    await waitFor(() => {
      expect(screen.getByTitle(newTitle)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.blur(screen.getByTitle(newTitle));
    });
  });

  test('should not change song title when song title is unchanged changed', async () => {
    const title = 'title';
    const updatePhraseSongTitleMock = jest.fn();
    const song = getSongMock({ title });

    mockElectronTrigger(updatePhraserSongTitleRecipe);
    usePhraser.setState(
      getPhraserMock({ selectedSong: { ...song, changes: [] }, update: updatePhraseSongTitleMock })
    );

    render(PartsInApp);

    act(() => {
      fireEvent.blur(screen.getByTitle(title));
    });

    expect(updatePhraseSongTitleMock).not.toHaveBeenCalled();
  });

  test('should delete part when confirm deletion via confirmation dialog', async () => {
    const updateMock = jest.fn();
    const song = getSongMock();

    mockElectronTrigger(deletePhraserCollectionSongRecipe);
    usePhraser.setState(
      getPhraserMock({
        collections: [
          {
            id: '1',
            title: '1',
            songs: [song]
          }
        ],
        selectedSong: { ...song, changes: [] },
        update: updateMock
      })
    );

    render(PartsInApp);

    const trashIcon = document.querySelector('.icon-trash');
    if (trashIcon) {
      act(() => {
        fireEvent.click(trashIcon);
      });
    }

    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText('Confirm'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
    });

    expect(updateMock).toHaveBeenCalledWith({
      collections: [{ id: '1', title: '1', songs: [] }],
      selectedSong: null
    });
  });

  test('should delete part when confirm deletion via confirmation dialog', async () => {
    const song = getSongMock();

    usePhraser.setState(
      getPhraserMock({
        selectedSong: { ...song, changes: [] }
      })
    );

    render(PartsInApp);

    const trashIcon = document.querySelector('.icon-trash');
    if (trashIcon) {
      act(() => {
        fireEvent.click(trashIcon);
      });
    }

    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByTitle('Cancel'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
    });
  });
});
