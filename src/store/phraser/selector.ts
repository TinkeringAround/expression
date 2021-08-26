import { PhraserState } from './index';
import { SongChange } from './types';

export const selectSongChangeGroups = ({ selectedSong }: PhraserState) => {
  const initialSongChangeGroups: { [key: string]: Array<SongChange> } = {};

  return (selectedSong?.changes ?? []).reduce((prev, songChange) => {
    const songChangeGroups = { ...prev };
    const date = songChange.date;

    if (songChangeGroups[date]) {
      songChangeGroups[date] = [...songChangeGroups[date], songChange];
    } else {
      songChangeGroups[date] = [songChange];
    }

    return songChangeGroups;
  }, initialSongChangeGroups);
};
