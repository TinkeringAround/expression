import { PhraserState } from './index';
import { SongChange } from './types';
import { Dict } from '../../lib/util';

export const selectSongChangeGroups = ({ selectedSong }: PhraserState) => {
  const initialSongChangeGroups: Dict<SongChange[]> = {};

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

export const selectSelectedSongIndices = ({ selectedSong, collections }: PhraserState) => {
  let collectionIndex = -1,
    songIndex = -1;

  if (selectedSong) {
    collections.some((collection, index) => {
      collection.songs.some((song, songIdx) => {
        if (song.id === selectedSong?.id) {
          songIndex = songIdx;
        }

        return songIndex >= 0;
      });

      if (songIndex >= 0) {
        collectionIndex = index;
      }

      return collectionIndex >= 0;
    });
  }

  return { collectionIndex, songIndex };
};
