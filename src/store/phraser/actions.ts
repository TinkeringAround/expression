import { DraggableLocation } from 'react-beautiful-dnd';

import { ACTION } from '../action-types';
import { Rhyme, Song } from './types';
import { usePhraser } from './index';
import { selectSelectedSongIndices } from './selector';

const { dispatch, trigger } = window.electron;

// ==============================================================
export const loadPhraser = () => dispatch(ACTION.loadPhraser);

export const updatePhraser = () => {
  const { collections, selectedSong } = usePhraser.getState();
  const { collectionIndex, songIndex } = selectSelectedSongIndices(usePhraser.getState());

  if (selectedSong && collectionIndex >= 0 && songIndex >= 0) {
    collections[collectionIndex].songs[songIndex] = selectedSong;
  }

  dispatch(ACTION.updatePhraser, { phraser: { collections } });
};

export const setKaraokeMode = (mode: boolean) => trigger(ACTION.setKaraokeMode, { mode });

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

export const deletePhraserCollectionSong = () => trigger(ACTION.deletePhraserCollectionSong);

export const selectPhraserSong = (song: Song) => trigger(ACTION.selectPhraserSong, { song });

export const updatePhraserSongTitle = (title: string) =>
  trigger(ACTION.updatePhraserSongTitle, { title });

export const addPhraserSongPart = () => trigger(ACTION.addPhraserSongPart);

export const deletePhraserSongPart = (partId: string) =>
  trigger(ACTION.deletePhraserSongPart, { partId });

export const updatePhraserSongPartName = (partId: string, name: string) =>
  trigger(ACTION.updatePhraserSongPartName, {
    partId,
    name
  });

export const addPhraserSongPartRhyme = (
  { templateId, snippetId }: { templateId?: string; snippetId?: string },
  destination: DraggableLocation
) => trigger(ACTION.addPhraserSongPartRhyme, { templateId, snippetId, destination });

export const updatePhraserSongPartRhyme = (rhymeId: string, line: string) =>
  trigger(ACTION.updatePhraserSongPartRhyme, { rhymeId, line });

export const deletePhraserSongPartRhyme = (rhymeId: string) =>
  trigger(ACTION.deletePhraserSongPartRhyme, { rhymeId });

export const reorderPhraserSongPartRhyme = (
  source: DraggableLocation,
  destination: DraggableLocation
) =>
  trigger(ACTION.reorderPhraserSongPartRhyme, {
    source,
    destination
  });

export const movePhraserSongPartRhyme = (
  source: DraggableLocation,
  destination: DraggableLocation
) =>
  trigger(ACTION.movePhraserSongPartRhyme, {
    source,
    destination
  });

export const formatPhraserSongPartRhyme = ({ id, lines }: Rhyme) => {
  const formattedLines = lines.map(line => line.trim()).join('\n');
  updatePhraserSongPartRhyme(id, formattedLines);
};
