import React, { FC, useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { usePhraser } from '../../store/phraser';
import {
  addPhraserSongPartRhyme,
  movePhraserSongPartRhyme,
  reorderPhraserSongPartRhyme
} from '../../store/phraser/actions';
import { toTemplate } from '../../lib/rhyme';

import { HasTestDrop } from '../../mock/components';

import { Grid, GridContent, GridSidepane, GridTabs } from '../../component/grid';
import If from '../../component/if';

import Collections from './collections';
import Templates, { TEMPLATES } from './templates';
import Parts from './parts';
import Changes from './changes';

const Phraser: FC<HasTestDrop> = ({ testDrop }) => {
  const { selectedSong } = usePhraser();

  const onDrop = useCallback((dropResult: DropResult) => {
    const { destination, source, draggableId } = dropResult;

    if (destination) {
      // CASE: ADD Template
      if (source.droppableId === TEMPLATES && destination.droppableId !== TEMPLATES) {
        addPhraserSongPartRhyme(toTemplate(draggableId), destination);
        return;
      }

      // CASE: REORDER inside a part
      if (destination.droppableId === source.droppableId) {
        reorderPhraserSongPartRhyme(source, destination);
        return;
      }

      // CASE: Move Rhyme to another Part
      movePhraserSongPartRhyme(source, destination);
    }
  }, []);

  return (
    <Grid {...(testDrop ? { onClick: () => onDrop(testDrop) } : {})}>
      <GridSidepane minWidth={300} maxWidth={400}>
        <Collections />
      </GridSidepane>

      <DragDropContext onDragEnd={onDrop}>
        <GridContent>
          <If condition={!!selectedSong}>
            <Parts />
          </If>
        </GridContent>

        <GridTabs
          tabs={[
            { name: 'Templates', component: <Templates /> },
            { name: 'Changes', component: <Changes /> }
          ]}
          initialTab={0}
        />
      </DragDropContext>
    </Grid>
  );
};

export default Phraser;
