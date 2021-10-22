import { usePhraser } from './index';
import { updatePhraser } from './actions';

import { getCollectionMock, getSongMock } from '../../mock/phraser';
import { mockElectronDispatch } from '../../mock/electron';

describe('Phraser Actions', () => {
  const INITIAL_PHRASER_STATE = usePhraser.getState();

  describe('updatePhraser', () => {
    const song = getSongMock();
    const collections = [getCollectionMock({ songs: [{ ...song, title: 'original' }] })];

    test('should update selected song in collections before update', () => {
      const updatePhraserMock = jest.fn();
      mockElectronDispatch(updatePhraserMock);
      usePhraser.setState({ ...INITIAL_PHRASER_STATE, selectedSong: song, collections });

      updatePhraser();

      expect(updatePhraserMock).toHaveBeenCalledWith(null, { phraser: { collections } });
    });

    test('should not update selectedSong in collections when no selectedSong is in phraser state', () => {
      const updatePhraserMock = jest.fn();
      mockElectronDispatch(updatePhraserMock);
      usePhraser.setState({ ...INITIAL_PHRASER_STATE, collections });

      updatePhraser();

      expect(updatePhraserMock).toHaveBeenCalledWith(null, { phraser: { collections } });
    });
  });
});
