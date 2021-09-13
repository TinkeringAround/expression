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
  Rhyme,
  UpdatePhraserSongPartRhymePayload,
  DeletePhraserSongPartRhymePayload,
  PhraserLoadedPayload
} from './types';
import { usePhraser } from './index';
import { generateId } from '../../lib/util';
import { withSongChanges } from '../../lib/song';
import { useNotification } from '../notification';
import { useSnippet } from '../snippet';
import { RhymeTransform } from '../../lib/rhyme/transform';
import { selectSelectedSongIndices } from './selector';

const { on } = window.electron;

// ==============================================================
export const phraserLoadedRecipe = (_: null, { phraser, error }: PhraserLoadedPayload) => {
  const { update } = usePhraser.getState();

  if (error) {
    const { update: updateNotifications, notifications } = useNotification.getState();
    notifications.push({ type: 'error', content: error });
    updateNotifications({ notifications });
  }

  if (phraser.collections) {
    update({ collections: phraser.collections });
  }
};

export const addPhraserCollectionRecipe = (_: null) => {
  const { update, collections } = usePhraser.getState();

  collections.push({ id: generateId(), title: 'UNTITLED', songs: [] });

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
    parts: [],
    changes: []
  });

  update({ collections });
};

export const deletePhraserCollectionSongRecipe = (_: null) => {
  const { update, collections, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const { collectionIndex, songIndex } = selectSelectedSongIndices(usePhraser.getState());

    collections[collectionIndex].songs.splice(songIndex, 1);

    update({ collections, selectedSong: null });
  }
};

export const selectPhraserSongRecipe = (_: null, { song }: SelectPhraserSongPayload) => {
  const { update, collections, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const { collectionIndex, songIndex } = selectSelectedSongIndices(usePhraser.getState());

    if (collectionIndex >= 0 && songIndex >= 0) {
      collections[collectionIndex].songs[songIndex] = selectedSong;
    }
  }

  if (selectedSong?.id !== song.id) {
    update({
      collections,
      selectedSong: { ...song }
    });
  }
};

export const updatePhraserSongTitleRecipe = (_: null, { title }: UpdatePhraserSongTitlePayload) => {
  const { update, collections, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const { collectionIndex, songIndex } = selectSelectedSongIndices(usePhraser.getState());

    selectedSong.title = title;
    collections[collectionIndex].songs[songIndex].title = title;

    update({ collections, selectedSong: withSongChanges('update', 'title', selectedSong) });
  }
};

export const addPhraserSongPartRecipe = (_: null) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    selectedSong.parts.push({ id: generateId(), name: 'UNTITLED', rhymes: [] });
    const withChanges = withSongChanges('add', 'part', selectedSong);
    update({ selectedSong: withChanges });
  }
};

export const deletePhraserSongPartRecipe = (_: null, { partId }: DeletePhraserSongPartPayload) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const partIndex = selectedSong.parts.findIndex(p => p.id === partId);

    selectedSong.parts.splice(partIndex, 1);

    update({ selectedSong: withSongChanges('remove', 'part', selectedSong) });
  }
};

export const updatePhraserSongPartNameRecipe = (
  _: null,
  { partId, name }: UpdatePhraserSongPartNamePayload
) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const partIndex = selectedSong.parts.findIndex(p => p.id === partId);
    selectedSong.parts[partIndex].name = name;

    update({ selectedSong: withSongChanges('update', 'part', selectedSong) });
  }
};

export const addPhraserSongPartRhymeRecipe = (
  _: null,
  { templateId, snippetId, destination }: AddPhraserSongPartRhymePayload
) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const rhymes: Rhyme[] = [];

    if (templateId) {
      rhymes.push(...RhymeTransform.toRhymes(RhymeTransform.toTemplate(templateId)));
    }

    if (snippetId) {
      const { snippets } = useSnippet.getState();
      const snippet = snippets.find(snippet => snippet.id === snippetId);
      rhymes.push({ id: generateId(), lines: snippet?.lines ?? [] });
    }

    const partIndex = selectedSong.parts.findIndex(p => p.id === destination.droppableId);
    selectedSong.parts[partIndex].rhymes.splice(destination.index, 0, ...rhymes);

    update({ selectedSong: withSongChanges('add', 'rhyme', selectedSong) });
  }
};

export const updatePhraserSongPartRhymeRecipe = (
  _: null,
  { rhymeId, line }: UpdatePhraserSongPartRhymePayload
) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    let partIndex = -1,
      rhymeIndex = -1;
    selectedSong.parts.some((part, index) => {
      rhymeIndex = part.rhymes.findIndex(rhyme => rhyme.id === rhymeId);

      if (rhymeIndex >= 0) {
        partIndex = index;
      }

      return rhymeIndex >= 0;
    });

    selectedSong.parts[partIndex].rhymes[rhymeIndex].lines = line.split('\n');

    update({ selectedSong: withSongChanges('update', 'line', selectedSong) });
  }
};

export const deletePhraserSongPartRhymeRecipe = (
  _: null,
  { rhymeId }: DeletePhraserSongPartRhymePayload
) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    let partIndex = -1,
      rhymeIndex = -1;
    selectedSong.parts.some((part, index) => {
      rhymeIndex = part.rhymes.findIndex(rhyme => rhyme.id === rhymeId);

      if (rhymeIndex >= 0) {
        partIndex = index;
      }

      return rhymeIndex >= 0;
    });

    selectedSong.parts[partIndex].rhymes.splice(rhymeIndex, 1);

    update({ selectedSong: withSongChanges('remove', 'rhyme', selectedSong) });
  }
};

export const reorderPhraserSongPartRhymeRecipe = (
  _: null,
  { source, destination }: ReorderPhraserSongPartRhymePayload
) => {
  const { update, selectedSong } = usePhraser.getState();

  if (selectedSong) {
    const partIndex = selectedSong.parts.findIndex(p => p.id === source.droppableId);
    const rhyme = selectedSong.parts[partIndex].rhymes[source.index];

    selectedSong.parts[partIndex].rhymes.splice(source.index, 1);
    selectedSong.parts[partIndex].rhymes.splice(destination.index, 0, rhyme);

    update({ selectedSong: withSongChanges('reorder', 'rhyme', selectedSong) });
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

    selectedSong.parts[sourcePartIndex].rhymes.splice(source.index, 1);
    selectedSong.parts[destinationPartIndex].rhymes.splice(destination.index, 0, rhyme);

    update({ selectedSong: withSongChanges('move', 'rhyme', selectedSong) });
  }
};

// ==============================================================
// Phraser Management
on(ACTION.phraserLoaded, phraserLoadedRecipe);

// Collection Management
on(ACTION.addPhraserCollection, addPhraserCollectionRecipe);
on(ACTION.reorderPhraserCollection, reorderPhraserCollectionRecipe);
on(ACTION.deletePhraserCollection, deletePhraserCollectionRecipe);

// Collection Manipulation
on(ACTION.updatePhraserCollectionTitle, updatePhraserCollectionTitleRecipe);
on(ACTION.reorderPhraserCollectionSongs, reorderPhraserCollectionSongsRecipe);
on(ACTION.movePhraserCollectionSong, movePhraserCollectionSongRecipe);
on(ACTION.addPhraserCollectionSong, addPhraserCollectionSongRecipe);
on(ACTION.deletePhraserCollectionSong, deletePhraserCollectionSongRecipe);

// Song Management
on(ACTION.selectPhraserSong, selectPhraserSongRecipe);

// Song Manipulation
on(ACTION.updatePhraserSongTitle, updatePhraserSongTitleRecipe);
on(ACTION.addPhraserSongPart, addPhraserSongPartRecipe);
on(ACTION.deletePhraserSongPart, deletePhraserSongPartRecipe);

// Song Rhyme Manipulation
on(ACTION.updatePhraserSongPartName, updatePhraserSongPartNameRecipe);
on(ACTION.addPhraserSongPartRhyme, addPhraserSongPartRhymeRecipe);
on(ACTION.updatePhraserSongPartRhyme, updatePhraserSongPartRhymeRecipe);
on(ACTION.deletePhraserSongPartRhyme, deletePhraserSongPartRhymeRecipe);
on(ACTION.reorderPhraserSongPartRhyme, reorderPhraserSongPartRhymeRecipe);
on(ACTION.movePhraserSongPartRhyme, movePhraserSongPartRhymeRecipe);
