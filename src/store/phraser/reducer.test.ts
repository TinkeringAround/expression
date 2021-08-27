import { usePhraser } from './index';
import {
  addPhraserCollectionRecipe,
  addPhraserCollectionSongRecipe,
  addPhraserSongPartRecipe,
  addPhraserSongPartRhymeRecipe,
  deletePhraserCollectionRecipe,
  deletePhraserCollectionSongRecipe,
  deletePhraserSongPartRecipe,
  deletePhraserSongPartRhymeRecipe,
  loadPhraserRecipe,
  movePhraserCollectionSongRecipe,
  movePhraserSongPartRhymeRecipe,
  reorderPhraserCollectionRecipe,
  reorderPhraserCollectionSongsRecipe,
  reorderPhraserSongPartRhymeRecipe,
  selectPhraserSongRecipe,
  updatePhraserCollectionTitleRecipe,
  updatePhraserSongPartNameRecipe,
  updatePhraserSongPartRhymeRecipe,
  updatePhraserSongTitleRecipe
} from './reducer';
import { Template } from './types';
import { toSnapshot } from '../../lib/util';

import {
  getCollectionMock,
  getCompleteCollectionsMock,
  getPartMock,
  getRhymeMock,
  getSongMock
} from '../../mock/collection';
import { toDate } from '../../lib/time';

describe('phraser reducer', () => {
  const initialPhraserState = usePhraser.getState();

  describe('loadPhraserRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should update collections when collections are not undefined', () => {
      loadPhraserRecipe(null, {
        phraser: {
          collections: getCompleteCollectionsMock()
        }
      });

      expect(usePhraser.getState().collections).toEqual(getCompleteCollectionsMock());
    });

    test('should not update collections when no collections are provided', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ update: updateMock });

      loadPhraserRecipe(null, { phraser: {} });

      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('addPhraserCollectionRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should add new collection to state', () => {
      usePhraser.setState({ collections: [] });

      addPhraserCollectionRecipe(null);

      expect(usePhraser.getState().collections.length).toBe(1);

      const collection = usePhraser.getState().collections[0];
      expect(collection.title).toBe('UNTITLED');
      expect(collection.songs.length).toBe(0);
    });
  });

  describe('addPhraserCollectionSongRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should delete selectedSong in collection when selectedSong is not null', () => {
      const song = getSongMock();
      const collection = getCollectionMock({ songs: [song] });
      usePhraser.setState({ collections: [collection], selectedSong: song });

      deletePhraserCollectionSongRecipe(null);

      const { collections, selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(collections[0].songs.length).toBe(0);
    });

    test('should delete right collection song when selectedSong is not null', () => {
      const firstSong = getSongMock({ id: '1' });
      const secondSong = getSongMock({ id: '2' });
      const collection = getCollectionMock({ songs: [secondSong, firstSong] });
      usePhraser.setState({ collections: [collection], selectedSong: firstSong });

      deletePhraserCollectionSongRecipe(null);

      const { collections, selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(collections[0].songs.length).toBe(1);
      expect(collections[0].songs[0].id).toBe(secondSong.id);
    });

    test('should not delete collection song when selectedSong is null', () => {
      const collection = getCollectionMock();
      const updateMock = jest.fn();
      usePhraser.setState({ collections: [collection], update: updateMock });

      deletePhraserCollectionSongRecipe(null);

      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('reorderPhraserCollectionRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should not reorder when order has not changed', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ update: updateMock });

      reorderPhraserCollectionRecipe(null, {
        source: { index: 0, droppableId: '' },
        destination: { index: 0, droppableId: '' }
      });

      expect(updateMock).not.toHaveBeenCalled();
    });

    test('should reorder collections when order has changed', () => {
      const firstCollection = getCollectionMock({ id: '1' });
      const secondCollection = getCollectionMock({ id: '2' });
      usePhraser.setState({
        collections: [firstCollection, secondCollection]
      });

      reorderPhraserCollectionRecipe(null, {
        source: { index: 0, droppableId: '' },
        destination: { index: 1, droppableId: '' }
      });

      const firstCollectionAfterReorder = usePhraser.getState().collections[0];
      expect(firstCollectionAfterReorder.id).toBe(secondCollection.id);
    });
  });

  describe('deletePhraserCollectionRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should delete a collection', () => {
      const collection = getCollectionMock();
      usePhraser.setState({ collections: [collection] });
      expect(usePhraser.getState().collections.length).toBe(1);

      deletePhraserCollectionRecipe(null, { collectionId: collection.id });

      expect(usePhraser.getState().collections.length).toBe(0);
    });
  });

  describe('updatePhraserCollectionTitleRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should update collection title when title differs', () => {
      const collection = getCollectionMock({ title: 'title' });
      const newTitle = 'new-title';
      usePhraser.setState({ collections: [collection] });

      updatePhraserCollectionTitleRecipe(null, { collectionId: collection.id, title: newTitle });

      const collectionWithChangedTitle = usePhraser.getState().collections[0];
      expect(collectionWithChangedTitle.title).toBe(newTitle);
    });

    test('should not update collection title when title does not differs', () => {
      const title = 'title';
      const collection = getCollectionMock({ title });
      const updateMock = jest.fn();
      usePhraser.setState({ collections: [collection], update: updateMock });

      updatePhraserCollectionTitleRecipe(null, { collectionId: collection.id, title });

      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('reorderPhraserCollectionSongsRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should reorder songs inside a collection', () => {
      const firstSong = getSongMock({ id: '11' });
      const secondSong = getSongMock({ id: '12' });
      const collection = getCollectionMock({ id: '1', songs: [firstSong, secondSong] });
      usePhraser.setState({ collections: [collection] });

      reorderPhraserCollectionSongsRecipe(null, {
        collectionId: collection.id,
        source: { droppableId: '', index: 0 },
        destination: { droppableId: '', index: 1 }
      });

      const firstSongAfterReorder = usePhraser.getState().collections[0].songs[0];
      expect(firstSongAfterReorder.id).toBe(secondSong.id);
    });
  });

  describe('movePhraserCollectionSongRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should move a song from one collectiont to anther', () => {
      const song = getSongMock();
      const firstCollection = getCollectionMock({ id: '1', songs: [song] });
      const secondCollection = getCollectionMock({ id: '2', songs: [] });
      usePhraser.setState({ collections: [firstCollection, secondCollection] });

      movePhraserCollectionSongRecipe(null, {
        source: { droppableId: '1', index: 0 },
        destination: { droppableId: '2', index: 0 }
      });

      const { collections } = usePhraser.getState();
      expect(collections[0].songs.length).toBe(0);

      expect(collections[1].id).toBe('2');
      expect(collections[1].songs.length).toBe(1);
      expect(collections[1].songs[0].id).toBe(song.id);
    });
  });

  describe('addPhraserCollectionSongRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should add song to a collection', () => {
      const collection = getCollectionMock({ id: '1', songs: [] });
      usePhraser.setState({ collections: [collection] });

      addPhraserCollectionSongRecipe(null, { collectionId: '1' });

      const { collections } = usePhraser.getState();
      expect(collections[0].songs.length).toBe(1);
      expect(collections[0].songs[0].title).toBe('UNTITLED');
    });
  });

  describe('selectPhraserSongRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should select song when ids differ', () => {
      const song = getSongMock({ id: '1' });
      const updateMock = jest.fn();
      usePhraser.setState({
        update: updateMock,
        selectedSong: { ...song, id: '2', changes: [] }
      });

      selectPhraserSongRecipe(null, { song });

      expect(updateMock).toHaveBeenCalledWith({ selectedSong: { ...song, changes: [] } });
    });

    test('should not select song when song is selected yet', () => {
      const song = getSongMock();
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: { ...song, changes: [] }, update: updateMock });

      selectPhraserSongRecipe(null, { song });

      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('updatePhraserSongTitleRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should update song title when song is not null', () => {
      const song = getSongMock({ title: 'old-title' });
      const title = 'new-title';
      usePhraser.setState({
        collections: [
          getCollectionMock({
            id: 'collection',
            songs: [song]
          })
        ],
        selectedSong: { ...song, changes: [] }
      });

      updatePhraserSongTitleRecipe(null, { title });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.title).toBe(title);
      expect(selectedSong?.changes).toEqual([
        {
          action: 'update',
          kind: 'title',
          date: toDate(Date.now()),
          snapshot: toSnapshot({ ...song, title })
        }
      ]);
    });

    test('should ignore update title when selected song is null', () => {
      const title = 'new-title';
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      updatePhraserSongTitleRecipe(null, { title });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('addPhraserSongPartRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should add new part to selected song when song is not null', () => {
      const song = getSongMock({ parts: [] });
      usePhraser.setState({ selectedSong: { ...song, changes: [] } });

      addPhraserSongPartRecipe(null);

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.parts.length).toBe(1);
      expect(selectedSong?.parts[0].name).toBe('UNTITLED');
      expect(selectedSong?.changes.length).toBe(1);
    });

    test('should ignore add part to a song when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      addPhraserSongPartRecipe(null);

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('deletePhraserSongPartRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should delete a part when selected song is not null', () => {
      const song = getSongMock({ parts: [getPartMock({ id: '11' })] });
      usePhraser.setState({ selectedSong: { ...song, changes: [] } });

      deletePhraserSongPartRecipe(null, { partId: '11' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.changes.length).toBe(1);
      expect(selectedSong?.parts.length).toBe(0);
    });

    test('should ignore deleting a part when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      deletePhraserSongPartRecipe(null, { partId: '11' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('updatePhraserSongPartNameRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should update song part name when selected song is not null', () => {
      const song = getSongMock({ parts: [getPartMock({ id: '11', name: 'old-name' })] });
      const name = 'new-name';
      usePhraser.setState({ selectedSong: { ...song, changes: [] } });

      updatePhraserSongPartNameRecipe(null, { partId: '11', name });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.changes.length).toBe(1);
      expect(selectedSong?.parts[0].name).toBe(name);
    });

    test('should ignore updating a part name when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      updatePhraserSongPartNameRecipe(null, { partId: '11', name: 'new-name' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('addPhraserSongPartRhymeRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should add rhymes according to template when selected song is not null', () => {
      const song = getSongMock({ parts: [getPartMock({ id: '1', rhymes: [] })] });
      usePhraser.setState({ selectedSong: { ...song, changes: [] } });

      addPhraserSongPartRhymeRecipe(null, {
        template: Template.SINGLE,
        destination: { index: 0, droppableId: '1' }
      });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.changes.length).toBe(1);
      expect(selectedSong?.parts[0].rhymes.length).toBe(1);
    });

    test('should ignore adding according to template when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      addPhraserSongPartRhymeRecipe(null, {
        template: Template.SINGLE,
        destination: { index: 0, droppableId: '1' }
      });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('updatePhraserSongPartRhymeRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should update song part rhyme line when selected song is not null', () => {
      const line = 'Test\nTest\nTest';
      const song = getSongMock({
        parts: [getPartMock({ id: '1', rhymes: [getRhymeMock({ id: '11', lines: [] })] })]
      });
      usePhraser.setState({ selectedSong: { ...song, changes: [] } });

      updatePhraserSongPartRhymeRecipe(null, { rhymeId: '11', line });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.changes.length).toBe(1);
      expect(selectedSong?.parts[0].rhymes[0].lines.length).toBe(3);
      line.split('\n').forEach((lineSplit, index) => {
        expect(lineSplit).toBe(selectedSong?.parts[0].rhymes[0].lines[index]);
      });
    });

    test('should not update song part rhyme line when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      updatePhraserSongPartRhymeRecipe(null, { rhymeId: '11', line: '' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('deletePhraserSongPartRhymeRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should delete song part rhyme line when selected song is not null', () => {
      const song = getSongMock({
        parts: [getPartMock({ id: '1', rhymes: [getRhymeMock({ id: '11' })] })]
      });
      usePhraser.setState({ selectedSong: { ...song, changes: [] } });

      deletePhraserSongPartRhymeRecipe(null, { rhymeId: '11' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.changes.length).toBe(1);
      expect(selectedSong?.parts[0].rhymes.length).toBe(0);
    });

    test('should not delete song part rhyme line when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      deletePhraserSongPartRhymeRecipe(null, { rhymeId: '11' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('reorderPhraserSongPartRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should reorder song part rhyme when selected song is not null', () => {
      const song = getSongMock({
        parts: [
          getPartMock({
            id: '11',
            rhymes: [getRhymeMock({ id: '111' }), getRhymeMock({ id: '112' })]
          })
        ]
      });
      usePhraser.setState({ selectedSong: { ...song, changes: [] } });

      reorderPhraserSongPartRhymeRecipe(null, {
        source: { index: 0, droppableId: '11' },
        destination: { index: 1, droppableId: '11' }
      });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.changes.length).toBe(1);
      expect(selectedSong?.parts[0].rhymes[0].id).toBe('112');
    });

    test('should ignore reordering part rhymes when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      reorderPhraserSongPartRhymeRecipe(null, {
        source: { index: 0, droppableId: '11' },
        destination: { index: 1, droppableId: '11' }
      });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('movePhraserSongPartRhymeRecipe', () => {
    beforeEach(() => {
      usePhraser.setState(initialPhraserState);
    });

    test('should move song part rhyme when selected song is not null', () => {
      const song = getSongMock({
        parts: [
          getPartMock({
            id: '11',
            rhymes: [getRhymeMock({ id: '111' })]
          }),
          getPartMock({
            id: '12',
            rhymes: [getRhymeMock({ id: '112' })]
          })
        ]
      });
      usePhraser.setState({ selectedSong: { ...song, changes: [] } });

      movePhraserSongPartRhymeRecipe(null, {
        source: { index: 0, droppableId: '11' },
        destination: { index: 1, droppableId: '12' }
      });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.changes.length).toBe(1);
      expect(selectedSong?.parts[0].rhymes.length).toBe(0);
      expect(selectedSong?.parts[1].rhymes.length).toBe(2);
      expect(selectedSong?.parts[1].rhymes[1].id).toBe('111');
    });

    test('should ignore moving part rhymes when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      movePhraserSongPartRhymeRecipe(null, {
        source: { index: 0, droppableId: '11' },
        destination: { index: 1, droppableId: '12' }
      });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });
});
