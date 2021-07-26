import { ACTION } from '../action-types';
import {
  DeletePhraserCollectionPayload,
  SelectPhraserSongPayload,
  ReorderPhraserCollectionSongsPayload,
  UpdatePhraserCollectionTitlePayload,
  ReorderPhraserCollectionRecipe,
  MovePhraserCollectionSongPayload,
  AddPhraserCollectionSongPayload
} from './types';
import { usePhraser } from './index';
import { generateId } from '../../lib/util';

const { on } = window.electron;

// ==============================================================
export const addPhraserCollectionRecipe = (_: null) => {
  const { update, collections } = usePhraser.getState();

  collections.push({
    id: generateId(),
    title: 'UNTITLED',
    songs: []
  });

  update({ collections });
};

export const reorderPhraserCollectionRecipe = (
  _: null,
  { source, destination }: ReorderPhraserCollectionRecipe
) => {
  const { update, collections } = usePhraser.getState();

  if (source.index !== destination.index) {
    const collection = collections[source.index];
    collections.splice(source.index, 1);
    collections.splice(destination.index, 0, collection);

    update({ collections });
  }
};

export const deletePhraserCollectionRecipe = (
  _: null,
  { collectionId }: DeletePhraserCollectionPayload
) => {
  const { update, collections } = usePhraser.getState();

  const collectionIndex = collections.findIndex(c => c.id === collectionId);
  collections.splice(collectionIndex, 1);

  update({ collections });
};

export const updatePhraserCollectionTitleRecipe = (
  _: null,
  { collectionId, title }: UpdatePhraserCollectionTitlePayload
) => {
  const { update, collections } = usePhraser.getState();

  const collectionIndex = collections.findIndex(c => c.id === collectionId);

  if (collections[collectionIndex].title !== title) {
    collections[collectionIndex].title = title;
    update({ collections });
  }
};

export const reorderPhraserCollectionSongsRecipe = (
  _: null,
  { collectionId, destination, source }: ReorderPhraserCollectionSongsPayload
) => {
  const { update, collections } = usePhraser.getState();

  const collectionIndex = collections.findIndex(c => c.id === collectionId);
  const song = collections[collectionIndex].songs[source.index];

  collections[collectionIndex].songs.splice(source.index, 1);
  collections[collectionIndex].songs.splice(destination.index, 0, song);

  update({ collections });
};

export const movePhraserCollectionSongRecipe = (
  _: null,
  { source, destination }: MovePhraserCollectionSongPayload
) => {
  const { update, collections } = usePhraser.getState();

  const collectionSourceIndex = collections.findIndex(c => c.id === source.droppableId);
  const collectionDestinationIndex = collections.findIndex(c => c.id === destination.droppableId);
  const song = collections[collectionSourceIndex].songs[source.index];

  collections[collectionSourceIndex].songs.splice(source.index, 1);
  collections[collectionDestinationIndex].songs.splice(destination.index, 0, song);

  update({ collections });
};

export const addPhraserCollectionSongRecipe = (
  _: null,
  { collectionId }: AddPhraserCollectionSongPayload
) => {
  const { update, collections } = usePhraser.getState();

  const collectionIndex = collections.findIndex(c => c.id === collectionId);
  collections[collectionIndex].songs.push({
    id: generateId(),
    title: 'UNTITLED',
    parts: []
  });

  update({ collections });
};

export const selectPhraserSongRecipe = (_: null, { song }: SelectPhraserSongPayload) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong?.id !== song.id) {
    update({ selectedSong: song });
  }
};

// ==============================================================
on(ACTION.addPhraserCollection, addPhraserCollectionRecipe);
on(ACTION.reorderPhraserCollection, reorderPhraserCollectionRecipe);
on(ACTION.deletePhraserCollection, deletePhraserCollectionRecipe);
on(ACTION.updatePhraserCollectionTitle, updatePhraserCollectionTitleRecipe);
on(ACTION.reorderPhraserCollectionSongs, reorderPhraserCollectionSongsRecipe);
on(ACTION.movePhraserCollectionSong, movePhraserCollectionSongRecipe);
on(ACTION.addPhraserCollectionSong, addPhraserCollectionSongRecipe);
on(ACTION.selectPhraserSong, selectPhraserSongRecipe);
