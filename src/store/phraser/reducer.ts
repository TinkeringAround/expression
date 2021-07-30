import { ACTION } from '../action-types';
import {
  DeletePhraserCollectionPayload,
  SelectPhraserSongPayload,
  ReorderPhraserCollectionSongsPayload,
  UpdatePhraserCollectionTitlePayload,
  ReorderPhraserCollectionRecipe,
  MovePhraserCollectionSongPayload,
  AddPhraserCollectionSongPayload,
  ReorderPhraserSongPartRhymePayload,
  MovePhraserSongPartRhymePayload,
  UpdatePhraserSongTitlePayload,
  UpdatePhraserSongPartNamePayload,
  DeletePhraserSongPartPayload,
  AddPhraserSongPartRhymePayload,
  Rhyme
} from './types';
import { usePhraser } from './index';
import { generateId } from '../../lib/util';
import { createRhymesByTemplate } from '../../lib/rhyme';

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
    update({
      selectedSong: {
        ...song,
        dirty: false
      }
    });
  }
};

export const updatePhraserSongTitleRecipe = (_: null, { title }: UpdatePhraserSongTitlePayload) => {
  const { update, collections, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    let collectionIndex = -1,
      songIndex = -1;
    collections.some((collection, colIndex) => {
      songIndex = collection.songs.findIndex(song => song.id === selectedSong.id);

      if (songIndex >= 0) {
        collectionIndex = colIndex;
      }

      return songIndex >= 0;
    });

    selectedSong.dirty = true;
    selectedSong.title = title;
    collections[collectionIndex].songs[songIndex].title = title;

    update({ collections, selectedSong });
  }
};

export const addPhraserSongPartRecipe = (_: null) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    selectedSong.dirty = true;
    selectedSong.parts.push({
      id: generateId(),
      name: 'UNTITLED',
      rhymes: []
    });

    update({ selectedSong });
  }
};

export const deletePhraserSongPartRecipe = (_: null, { partId }: DeletePhraserSongPartPayload) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const partIndex = selectedSong.parts.findIndex(p => p.id === partId);

    selectedSong.dirty = true;
    selectedSong.parts.splice(partIndex, 1);

    update({ selectedSong });
  }
};

export const updatePhraserSongPartNameRecipe = (
  _: null,
  { partId, name }: UpdatePhraserSongPartNamePayload
) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const partIndex = selectedSong.parts.findIndex(p => p.id === partId);

    selectedSong.dirty = true;
    selectedSong.parts[partIndex].name = name;

    update({ selectedSong });
  }
};

export const addPhraserSongPartRhymeRecipe = (
  _: null,
  { template, destination }: AddPhraserSongPartRhymePayload
) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const rhymes: Rhyme[] = createRhymesByTemplate(template);
    const partIndex = selectedSong.parts.findIndex(p => p.id === destination.droppableId);

    selectedSong.dirty = true;
    selectedSong.parts[partIndex].rhymes.splice(destination.index, 0, ...rhymes);

    update({ selectedSong });
  }
};

export const reorderPhraserSongPartRhymeRecipe = (
  _: null,
  { source, destination }: ReorderPhraserSongPartRhymePayload
) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const rhymeIndex = selectedSong.parts.findIndex(p => p.id === source.droppableId);
    const rhyme = selectedSong.parts[rhymeIndex].rhymes[source.index];

    selectedSong.dirty = true;
    selectedSong.parts[rhymeIndex].rhymes.splice(source.index, 1);
    selectedSong.parts[rhymeIndex].rhymes.splice(destination.index, 0, rhyme);

    update({ selectedSong });
  }
};

export const movePhraserSongPartRhymeRecipe = (
  _: null,
  { source, destination }: MovePhraserSongPartRhymePayload
) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const sourcePartIndex = selectedSong.parts.findIndex(p => p.id === source.droppableId);
    const destinationPartIndex = selectedSong.parts.findIndex(
      p => p.id === destination.droppableId
    );
    const rhyme = selectedSong.parts[sourcePartIndex].rhymes[source.index];

    selectedSong.dirty = true;
    selectedSong.parts[sourcePartIndex].rhymes.splice(source.index, 1);
    selectedSong.parts[destinationPartIndex].rhymes.splice(destination.index, 0, rhyme);

    update({ selectedSong });
  }
};

// ==============================================================
// Collection Management
on(ACTION.addPhraserCollection, addPhraserCollectionRecipe);
on(ACTION.reorderPhraserCollection, reorderPhraserCollectionRecipe);
on(ACTION.deletePhraserCollection, deletePhraserCollectionRecipe);

// Collection Manipulation
on(ACTION.updatePhraserCollectionTitle, updatePhraserCollectionTitleRecipe);
on(ACTION.reorderPhraserCollectionSongs, reorderPhraserCollectionSongsRecipe);
on(ACTION.movePhraserCollectionSong, movePhraserCollectionSongRecipe);
on(ACTION.addPhraserCollectionSong, addPhraserCollectionSongRecipe);

// Song Management
on(ACTION.selectPhraserSong, selectPhraserSongRecipe);

// Song Manipulation
on(ACTION.updatePhraserSongTitle, updatePhraserSongTitleRecipe);
on(ACTION.addPhraserSongPart, addPhraserSongPartRecipe);
on(ACTION.deletePhraserSongPart, deletePhraserSongPartRecipe);

// Song Rhyme Manipulation
on(ACTION.updatePhraserSongPartName, updatePhraserSongPartNameRecipe);
on(ACTION.addPhraserSongPartRhyme, addPhraserSongPartRhymeRecipe);
on(ACTION.reorderPhraserSongPartRhyme, reorderPhraserSongPartRhymeRecipe);
on(ACTION.movePhraserSongPartRhyme, movePhraserSongPartRhymeRecipe);
