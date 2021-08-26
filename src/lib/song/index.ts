import { Song, SongChangeAction, SongElementKind } from '../../store/phraser/types';
import { toSnapshot } from '../util';
import { toDate } from '../time';

/**
 * Add Song Changes to editable song
 * @param action the mutation action
 * @param kind which song element has been changed
 * @param editableSong the editable song
 * @returns EditableSong the song with updated changes
 */
export const withSongChanges = (
  action: SongChangeAction,
  kind: SongElementKind,
  editableSong: Song
): Song => ({
  ...editableSong,
  changes: [
    ...editableSong.changes,
    {
      kind,
      action,
      date: toDate(Date.now()),
      snapshot: toSnapshot(editableSong)
    }
  ]
});
