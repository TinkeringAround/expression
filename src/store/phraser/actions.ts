import { ACTION } from '../action-types';
import { Song } from './types';
import { DraggableLocation } from 'react-beautiful-dnd';

const { trigger } = window.electron;

// ==============================================================
export const addPhraserCollection = () => trigger(ACTION.addPhraserCollection);

export const reorderPhraserCollection = (
  source: DraggableLocation,
  destination: DraggableLocation
) =>
  trigger(ACTION.reorderPhraserCollection, {
    source,
    destination
  });

export const deletePhraserCollection = (collectionId: string) =>
  trigger(ACTION.deletePhraserCollection, { collectionId });

export const updatePhraserCollectionTitle = (collectionId: string, title: string) =>
  trigger(ACTION.updatePhraserCollectionTitle, {
    collectionId,
    title
  });

export const reorderPhraserCollectionSongs = (
  collectionId: string,
  source: DraggableLocation,
  destination: DraggableLocation
) =>
  trigger(ACTION.reorderPhraserCollectionSongs, {
    collectionId,
    source,
    destination
  });

export const movePhraserCollectionSong = (
  source: DraggableLocation,
  destination: DraggableLocation
) => trigger(ACTION.movePhraserCollectionSong, { source, destination });

export const addPhraserCollectionSong = (collectionId: string) =>
  trigger(ACTION.addPhraserCollectionSong, { collectionId });

export const selectPhraserSong = (song: Song) => trigger(ACTION.selectPhraserSong, { song });

export const deletePhraserSong = (song: Song) => trigger(ACTION.deletePhraserSong, { song });
