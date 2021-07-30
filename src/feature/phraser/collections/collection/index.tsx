import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { MusicCollection } from '../../../../store/phraser/types';
import {
  addPhraserCollectionSong,
  deletePhraserCollection,
  updatePhraserCollectionTitle
} from '../../../../store/phraser/actions';

import If from '../../../../component/if';
import For from '../../../../component/for';
import Icon, { IconType } from '../../../../component/icon';

import CollectionSong from './collection-song';
import { SCollection } from './styled';

interface Props {
  collection: MusicCollection;
  index: number;
}

const Collection: FC<Props> = ({ collection: { title, songs, id }, index }) => {
  const [inputTitle, setInputTitle] = useState<string>(title);
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded, setExpanded]);

  const updateCollectionName = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setInputTitle(value);
    },
    [inputTitle, setInputTitle]
  );

  const deleteCollection = useCallback(() => {
    deletePhraserCollection(id);
  }, [id]);

  const saveTitleChanges = useCallback(() => {
    updatePhraserCollectionTitle(id, inputTitle);
  }, [id, inputTitle]);

  const addSong = useCallback(() => {
    addPhraserCollectionSong(id);
  }, [id]);

  const handleClick = useCallback(
    ({ target }) => {
      const { className } = target as HTMLDivElement;

      // omit when click on input
      if (className.includes('title')) {
        return;
      }

      // delete when click on trash icon
      if (className.includes('trash')) {
        deleteCollection();
        return;
      }

      toggle();
    },
    [toggle, deleteCollection]
  );

  const icon: IconType = expanded ? 'arrow-double-up' : 'arrow-double-down';

  return (
    <Draggable draggableId={id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => (
        <SCollection
          className={`${expanded && 'expanded'}`}
          style={{ height: expanded ? 120 + songs.length * 40 : 80 }}
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
        >
          <div className="head" onClick={handleClick}>
            <Icon title="Toggle Collection" iconType={icon} />
            <input
              className="title"
              title={inputTitle}
              value={inputTitle}
              onChange={updateCollectionName}
              onBlur={saveTitleChanges}
            />
            <Icon title="Delete Collection" iconType="trash" />
          </div>
          <If condition={expanded}>
            <Droppable droppableId={id} type="SONG">
              {({ placeholder, innerRef, droppableProps }) => (
                <div ref={innerRef} {...droppableProps}>
                  <For
                    values={songs}
                    projector={(song, index) => (
                      <CollectionSong key={song.id} song={song} index={index} />
                    )}
                  />
                  {placeholder}
                </div>
              )}
            </Droppable>

            <footer>
              <button onClick={addSong}>Add Song</button>
            </footer>
          </If>
        </SCollection>
      )}
    </Draggable>
  );
};

export default Collection;
