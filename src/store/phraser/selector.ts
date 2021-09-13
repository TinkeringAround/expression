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
