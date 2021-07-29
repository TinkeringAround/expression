import { PhraserState } from './index';

export const selectSelectedSongIsDirty = ({ selectedSong }: PhraserState) =>
  !!selectedSong && selectedSong.dirty;
