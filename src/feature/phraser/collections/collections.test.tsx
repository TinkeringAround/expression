import React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { usePhraser } from '../../../store/phraser';
import {
  addPhraserCollectionRecipe,
  movePhraserCollectionSongRecipe,
  reorderPhraserCollectionRecipe,
  reorderPhraserCollectionSongsRecipe
} from '../../../store/phraser/reducer';

import Collections from './index';

import { AppMock } from '../../../mock/components';
import { getPhraserMock } from '../../../mock/store';
import { mockElectronTrigger } from '../../../mock/electron';
import { getCollectionMock, getSongMock } from '../../../mock/collection';
import { getDropResultMock } from '../../../mock/window';

describe('Collections', () => {
  const CollectionsInApp = (testDrop?: DropResult) => (
    <AppMock>
      <Collections {...(testDrop ? { testDrop } : {})} />
    </AppMock>
  );

  beforeEach(() => {
    usePhraser.setState(getPhraserMock());
  });

  it('should render all collections and footer', () => {
    render(CollectionsInApp());

    const { collections } = usePhraser.getState();

    collections.every(collection => {
      expect(screen.getByTitle(collection.title)).toBeInTheDocument();
    });
    expect(screen.getByText('Add Collection')).toBeInTheDocument();
  });

  it('should add a collection when click on add collection button', () => {
    mockElectronTrigger(addPhraserCollectionRecipe);
    usePhraser.setState(getPhraserMock({ collections: [] }));

    render(CollectionsInApp());

    act(() => {
      fireEvent.click(screen.getByText('Add Collection'));
    });

    expect(screen.getByTitle('UNTITLED')).toBeInTheDocument();
  });

  it('should reorder collections when collections are getting reordered by drag', () => {
    mockElectronTrigger(reorderPhraserCollectionRecipe);
    usePhraser.setState(
      getPhraserMock({
        collections: [
          { ...getCollectionMock(), id: '11', title: 'first' },
          { ...getCollectionMock(), id: '12', title: 'second' }
        ]
      })
    );

    render(
      CollectionsInApp(
        getDropResultMock({
          source: { droppableId: 'collection', index: 0 }, // id must be 'collection'
          destination: { droppableId: 'collection', index: 1 } // id must be 'collection'
        })
      )
    );

    act(() => {
      fireEvent.click(screen.getByText('Collections'));
    });

    expect(usePhraser.getState().collections[0].id).toBe('12');
  });

  it('should reorder songs inside a collection when a collection song is reordered by drag', () => {
    mockElectronTrigger(reorderPhraserCollectionSongsRecipe);
    const id = 'collectionId';
    usePhraser.setState(
      getPhraserMock({
        collections: [
          getCollectionMock({
            id,
            songs: [getSongMock({ id: 'first' }), getSongMock({ id: 'second' })]
          })
        ]
      })
    );

    render(
      CollectionsInApp({
        mode: 'FLUID',
        type: 'SONG', // type must be 'SONG' to reorder inside a collection
        reason: 'DROP',
        draggableId: '',
        source: { droppableId: id, index: 0 }, // id must be 'collection'
        destination: { droppableId: id, index: 1 } // id must be 'collection'
      })
    );

    act(() => {
      fireEvent.click(screen.getByText('Collections'));
    });

    expect(usePhraser.getState().collections[0].songs[0].id).toBe('second');
  });

  it('should move a collection song when a collection song is dragged to another collection', () => {
    mockElectronTrigger(movePhraserCollectionSongRecipe);
    usePhraser.setState(
      getPhraserMock({
        collections: [
          { id: '11', title: 'first', songs: [getSongMock({ id: 'first' })] },
          { id: '12', title: 'second', songs: [] }
        ]
      })
    );

    render(
      CollectionsInApp({
        mode: 'FLUID',
        type: 'SONG', // must be 'SONG'
        reason: 'DROP',
        draggableId: '',
        source: { droppableId: '11', index: 0 },
        destination: { droppableId: '12', index: 0 }
      })
    );

    act(() => {
      fireEvent.click(screen.getByText('Collections'));
    });

    expect(usePhraser.getState().collections[0].songs.length).toBe(0);
    expect(usePhraser.getState().collections[1].songs.length).toBe(1);
    expect(usePhraser.getState().collections[1].songs[0].id).toBe('first');
  });

  it('should not move a collection song when a collection song drag is cancelled', () => {
    mockElectronTrigger(movePhraserCollectionSongRecipe);
    usePhraser.setState(
      getPhraserMock({
        collections: [
          { id: '11', title: 'first', songs: [getSongMock({ id: 'first' })] },
          { id: '12', title: 'second', songs: [] }
        ]
      })
    );

    render(
      CollectionsInApp({
        mode: 'FLUID',
        type: 'SONG', // must be 'SONG'
        reason: 'CANCEL',
        draggableId: '',
        source: { droppableId: '11', index: 0 }
      })
    );

    act(() => {
      fireEvent.click(screen.getByText('Collections'));
    });

    expect(usePhraser.getState().collections[0].songs.length).toBe(1);
    expect(usePhraser.getState().collections[0].songs[0].id).toBe('first');
    expect(usePhraser.getState().collections[1].songs.length).toBe(0);
  });
});
