import React, { FC, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Song } from '../../../../../store/phraser/types';
import { selectPhraserSong } from '../../../../../store/phraser/actions';
import { usePhraser } from '../../../../../store/phraser';

import { SCollectionSong } from './styled';

interface Props {
  song: Song;
  index: number;
}

const CollectionSong: FC<Props> = ({ song, index }) => {
  const { selectedSong } = usePhraser();

  const selectSong = useCallback(() => {
    selectPhraserSong(song);
  }, [song]);

  const isSelected = selectedSong?.id === song.id;

  return (
    <Draggable draggableId={song.id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => (
        <SCollectionSong
          className={`${isSelected && 'selected'}`}
          ref={innerRef}
          onClick={selectSong}
          {...draggableProps}
          {...dragHandleProps}
        >
          {song.title}
        </SCollectionSong>
      )}
    </Draggable>
  );
};

export default CollectionSong;
