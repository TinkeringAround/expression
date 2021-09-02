import { toSnapshot } from '../util';

import { Song } from '../../store/phraser/types';
import { withSongChanges } from './index';
import { toDate } from '../time';

import { getSongMock } from '../../mock/phraser';

describe('song', () => {
  describe('withSongChanges', () => {
    it('should return editable song with updated change', () => {
      const editableSong: Song = { ...getSongMock(), changes: [] };

      const updatedEditableSong = withSongChanges('update', 'title', editableSong);

      expect(updatedEditableSong.changes).toEqual([
        {
          action: 'update',
          kind: 'title',
          date: toDate(Date.now()),
          snapshot: toSnapshot(editableSong)
        }
      ]);
    });
  });
});
