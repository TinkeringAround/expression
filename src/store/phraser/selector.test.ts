import { selectSelectedSongIsDirty } from './selector';

import { getPhraserMock } from '../../mock/store';
import { getSongMock } from '../../mock/collection';

describe('phraser selector', () => {
  describe('selectSelectedSongIsDirty', () => {
    it('should return false when song is null', () => {
      const phraserState = getPhraserMock({ selectedSong: null });

      expect(selectSelectedSongIsDirty(phraserState)).toBeFalsy();
    });

    it('should return false when song is not null but dirty is false', () => {
      const song = getSongMock();
      const phraserState = getPhraserMock({ selectedSong: { ...song, dirty: false } });

      expect(selectSelectedSongIsDirty(phraserState)).toBeFalsy();
    });

    it('should return true when song is not null and dirty is true', () => {
      const song = getSongMock();
      const phraserState = getPhraserMock({ selectedSong: { ...song, dirty: true } });

      expect(selectSelectedSongIsDirty(phraserState)).toBeTruthy();
    });
  });
});
