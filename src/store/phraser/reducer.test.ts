import { usePhraser } from './index';
import {
  addPhraserCollectionRecipe,
  addPhraserCollectionSongRecipe,
  addPhraserSongPartRecipe,
  addPhraserSongPartRhymeRecipe,
  deletePhraserCollectionRecipe,
  deletePhraserSongPartRecipe,
  deletePhraserSongPartRhymeRecipe,
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

import { getPhraserMock } from '../../mock/store';
import { getCollectionMock, getPartMock, getRhymeMock, getSongMock } from '../../mock/collection';

describe('phraser reducer', () => {
  describe('addPhraserCollectionRecipe', () => {
    it('should add new collection to state', () => {
      usePhraser.setState(getPhraserMock({ collections: [] }));

      addPhraserCollectionRecipe(null);

      expect(usePhraser.getState().collections.length).toBe(1);

      const collection = usePhraser.getState().collections[0];
      expect(collection.title).toBe('UNTITLED');
      expect(collection.songs.length).toBe(0);
    });
  });

  describe('reorderPhraserCollectionRecipe', () => {
    it('should not reorder when order has not changed', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ update: updateMock });

      reorderPhraserCollectionRecipe(null, {
        source: { index: 0, droppableId: '' },
        destination: { index: 0, droppableId: '' }
      });

      expect(updateMock).not.toHaveBeenCalled();
    });

    it('should reorder collections when order has changed', () => {
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
    it('should delete a collection', () => {
      const collection = getCollectionMock();
      usePhraser.setState({ collections: [collection] });
      expect(usePhraser.getState().collections.length).toBe(1);

      deletePhraserCollectionRecipe(null, { collectionId: collection.id });

      expect(usePhraser.getState().collections.length).toBe(0);
    });
  });

  describe('updatePhraserCollectionTitleRecipe', () => {
    it('should update collection title when title differs', () => {
      const collection = getCollectionMock({ title: 'title' });
      const newTitle = 'new-title';
      usePhraser.setState({ collections: [collection] });

      updatePhraserCollectionTitleRecipe(null, { collectionId: collection.id, title: newTitle });

      const collectionWithChangedTitle = usePhraser.getState().collections[0];
      expect(collectionWithChangedTitle.title).toBe(newTitle);
    });

    it('should not update collection title when title does not differs', () => {
      const title = 'title';
      const collection = getCollectionMock({ title });
      const updateMock = jest.fn();
      usePhraser.setState({ collections: [collection], update: updateMock });

      updatePhraserCollectionTitleRecipe(null, { collectionId: collection.id, title });

      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('updatePhraserCollectionTitleRecipe', () => {
    it('should reorder songs inside a collection', () => {
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
    it('should move a song from one collectiont to anther', () => {
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
    it('should add song to a collection', () => {
      const collection = getCollectionMock({ id: '1', songs: [] });
      usePhraser.setState({ collections: [collection] });

      addPhraserCollectionSongRecipe(null, { collectionId: '1' });

      const { collections } = usePhraser.getState();
      expect(collections[0].songs.length).toBe(1);
      expect(collections[0].songs[0].title).toBe('UNTITLED');
    });
  });

  describe('selectPhraserSongRecipe', () => {
    it('should select song when ids differ', () => {
      const song = getSongMock({ id: '1' });
      const updateMock = jest.fn();
      usePhraser.setState(
        getPhraserMock({
          update: updateMock,
          selectedSong: { ...song, id: '2', dirty: false }
        })
      );

      selectPhraserSongRecipe(null, { song });

      expect(updateMock).toHaveBeenCalledWith({ selectedSong: { ...song, dirty: false } });
    });

    it('should not select song when song is selected yet', () => {
      const song = getSongMock();
      const updateMock = jest.fn();
      usePhraser.setState(
        getPhraserMock({ selectedSong: { ...song, dirty: false }, update: updateMock })
      );

      selectPhraserSongRecipe(null, { song });

      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('updatePhraserSongTitleRecipe', () => {
    it('should update song when title when song is not null', () => {
      const song = getSongMock({ title: 'old-title' });
      const title = 'new-title';
      usePhraser.setState({ selectedSong: { ...song, dirty: false } });

      updatePhraserSongTitleRecipe(null, { title });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.title).toBe(title);
      expect(selectedSong?.dirty).toBeTruthy();
    });

    it('should ignore update title when selected song is null', () => {
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
    it('should add new part to selected song when song is not null', () => {
      const song = getSongMock({ parts: [] });
      usePhraser.setState({ selectedSong: { ...song, dirty: false } });

      addPhraserSongPartRecipe(null);

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.dirty).toBeTruthy();
      expect(selectedSong?.parts.length).toBe(1);
      expect(selectedSong?.parts[0].name).toBe('UNTITLED');
    });

    it('should ignore add part to a song when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      addPhraserSongPartRecipe(null);

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('deletePhraserSongPartRecipe', () => {
    it('should delete a part when selected song is not null', () => {
      const song = getSongMock({ parts: [getPartMock({ id: '11' })] });
      usePhraser.setState({ selectedSong: { ...song, dirty: false } });

      deletePhraserSongPartRecipe(null, { partId: '11' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.dirty).toBeTruthy();
      expect(selectedSong?.parts.length).toBe(0);
    });

    it('should ignore deleting a part when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      deletePhraserSongPartRecipe(null, { partId: '11' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('updatePhraserSongPartNameRecipe', () => {
    it('should update song part name when selected song is not null', () => {
      const song = getSongMock({ parts: [getPartMock({ id: '11', name: 'old-name' })] });
      const name = 'new-name';
      usePhraser.setState({ selectedSong: { ...song, dirty: false } });

      updatePhraserSongPartNameRecipe(null, { partId: '11', name });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.dirty).toBeTruthy();
      expect(selectedSong?.parts[0].name).toBe(name);
    });

    it('should ignore updating a part name when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      updatePhraserSongPartNameRecipe(null, { partId: '11', name: 'new-name' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('addPhraserSongPartRhymeRecipe', () => {
    it('should add rhymes according to template when selected song is not null', () => {
      const song = getSongMock({ parts: [getPartMock({ id: '1', rhymes: [] })] });
      usePhraser.setState({ selectedSong: { ...song, dirty: false } });

      addPhraserSongPartRhymeRecipe(null, {
        template: Template.SINGLE,
        destination: { index: 0, droppableId: '1' }
      });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.dirty).toBeTruthy();
      expect(selectedSong?.parts[0].rhymes.length).toBe(1);
    });

    it('should ignore adding according to template when selected song is null', () => {
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
    it('should update song part rhyme line when selected song is not null', () => {
      const line = 'Test\nTest\nTest';
      const song = getSongMock({
        parts: [getPartMock({ id: '1', rhymes: [getRhymeMock({ id: '11', lines: [] })] })]
      });
      usePhraser.setState({ selectedSong: { ...song, dirty: false } });

      updatePhraserSongPartRhymeRecipe(null, { rhymeId: '11', line });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.dirty).toBeTruthy();
      expect(selectedSong?.parts[0].rhymes[0].lines.length).toBe(3);
      line.split('\n').forEach((lineSplit, index) => {
        expect(lineSplit).toBe(selectedSong?.parts[0].rhymes[0].lines[index]);
      });
    });

    it('should not update song part rhyme line when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      updatePhraserSongPartRhymeRecipe(null, { rhymeId: '11', line: '' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('deletePhraserSongPartRhymeRecipe', () => {
    it('should delete song part rhyme line when selected song is not null', () => {
      const song = getSongMock({
        parts: [getPartMock({ id: '1', rhymes: [getRhymeMock({ id: '11' })] })]
      });
      usePhraser.setState({ selectedSong: { ...song, dirty: false } });

      deletePhraserSongPartRhymeRecipe(null, { rhymeId: '11' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.dirty).toBeTruthy();
      expect(selectedSong?.parts[0].rhymes.length).toBe(0);
    });

    it('should not delete song part rhyme line when selected song is null', () => {
      const updateMock = jest.fn();
      usePhraser.setState({ selectedSong: null, update: updateMock });

      deletePhraserSongPartRhymeRecipe(null, { rhymeId: '11' });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong).toBeNull();
      expect(updateMock).not.toHaveBeenCalled();
    });
  });

  describe('reorderPhraserSongPartRecipe', () => {
    it('should reorder song part rhyme when selected song is not null', () => {
      const song = getSongMock({
        parts: [
          getPartMock({
            id: '11',
            rhymes: [getRhymeMock({ id: '111' }), getRhymeMock({ id: '112' })]
          })
        ]
      });
      usePhraser.setState({ selectedSong: { ...song, dirty: false } });

      reorderPhraserSongPartRhymeRecipe(null, {
        source: { index: 0, droppableId: '11' },
        destination: { index: 1, droppableId: '11' }
      });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.dirty).toBeTruthy();
      expect(selectedSong?.parts[0].rhymes[0].id).toBe('112');
    });

    it('should ignore reordering part rhymes when selected song is null', () => {
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
    it('should move song part rhyme when selected song is not null', () => {
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
      usePhraser.setState({ selectedSong: { ...song, dirty: false } });

      movePhraserSongPartRhymeRecipe(null, {
        source: { index: 0, droppableId: '11' },
        destination: { index: 1, droppableId: '12' }
      });

      const { selectedSong } = usePhraser.getState();
      expect(selectedSong?.dirty).toBeTruthy();
      expect(selectedSong?.parts[0].rhymes.length).toBe(0);
      expect(selectedSong?.parts[1].rhymes.length).toBe(2);
      expect(selectedSong?.parts[1].rhymes[1].id).toBe('111');
    });

    it('should ignore moving part rhymes when selected song is null', () => {
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
