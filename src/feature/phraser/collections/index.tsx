import React, { FC, useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { usePhraser } from '../../../store/phraser';
import {
  addPhraserCollection,
  movePhraserCollectionSong,
  reorderPhraserCollection,
  reorderPhraserCollectionSongs
} from '../../../store/phraser/actions';

import For from '../../../component/for';
import Collection from './collection';

import { SCollectionFooter, SCollections } from './styled';

const COLLECTION = 'collection';

const Collections: FC = () => {
  const { collections } = usePhraser();

  const addCollection = useCallback(() => {
    addPhraserCollection();
  }, []);

  const onDrop = useCallback((dropResult: DropResult) => {
    const { destination, source, type } = dropResult;

    // CASE: REORDER COLLECTIONS
    if (source.droppableId === COLLECTION && destination?.droppableId === COLLECTION) {
      reorderPhraserCollection(source, destination);
      return;
    }

    // CASE: REORDER SONGS
    if (type === 'SONG' && destination) {
      // CASE: INSIDE A SINGLE COLLECTION
      if (destination.droppableId === source.droppableId) {
        reorderPhraserCollectionSongs(source.droppableId, source, destination);
        return;
      }

      // CASE: BETWEEN COLLECTIONS
      movePhraserCollectionSong(source, destination);
    }
  }, []);

  return (
    <DragDropContext onDragEnd={onDrop}>
      <SCollections>
        <h1>Collections</h1>
        <Droppable droppableId={COLLECTION}>
          {({ placeholder, innerRef, droppableProps }) => (
            <div className="collections" ref={innerRef} {...droppableProps}>
              <For
                values={collections}
                projector={(collection, index) => (
                  <Collection key={collection.id} collection={collection} index={index} />
                )}
              />
              {placeholder}
            </div>
          )}
        </Droppable>
        <SCollectionFooter onClick={addCollection}>
          <span>Add Collection</span>
        </SCollectionFooter>
      </SCollections>
    </DragDropContext>
  );
};

export default Collections;
