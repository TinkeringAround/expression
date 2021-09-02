import { selectSongChangeGroups } from './selector';

import { getPhraserMock, getSongChangeMock, getSongMock } from '../../mock/phraser';

describe('phraser selector', () => {
  describe('selectSongChangeGroups', () => {
    test('should return empty object when selectedSong is null', () => {
      const songChangeGroups = selectSongChangeGroups(getPhraserMock());

      expect(songChangeGroups).toEqual({});
    });

    test('should return single group when selectedSong changes contain only one change', () => {
      const songChangeMock = getSongChangeMock();
      const songChangeGroups = selectSongChangeGroups(
        getPhraserMock({
          selectedSong: {
            ...getSongMock(),
            changes: [songChangeMock]
          }
        })
      );

      expect(songChangeGroups).toEqual({
        [songChangeMock.date]: [songChangeMock]
      });
    });

    test('should return grouped changes when selectedSong contains multiple changes in one day', () => {
      const firstGroupSongChanges = [getSongChangeMock(), getSongChangeMock()];
      const secondGroupSongChanges = [getSongChangeMock({ date: '02. Jan 1970' })];
      const songChangeGroups = selectSongChangeGroups(
        getPhraserMock({
          selectedSong: {
            ...getSongMock(),
            changes: [...firstGroupSongChanges, ...secondGroupSongChanges]
          }
        })
      );

      expect(songChangeGroups).toEqual({
        [getSongChangeMock().date]: firstGroupSongChanges,
        '02. Jan 1970': secondGroupSongChanges
      });
    });
  });
});
