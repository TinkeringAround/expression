import React, { FC, useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useNotification } from '../../store/notification';
import { usePhraser } from '../../store/phraser';
import {
  addPhraserSongPartRhyme,
  movePhraserSongPartRhyme,
  reorderPhraserSongPartRhyme
} from '../../store/phraser/actions';
import { reorderSnippet } from '../../store/snippet/actions';

import { HasTestDrop } from '../../mock/components';

import { Grid, GridContent, GridSidepane, GridTabs } from '../../component/grid';
import { Notifications } from '../../component/tabs';
import If from '../../component/if';

import Collections from './collections';
import Templates, { TEMPLATES } from './templates';
import SongParts from './song-parts';
import Changes from './changes';
import Snippets, { SNIPPETS } from './snippets';
import Library from './library';

const Phraser: FC<HasTestDrop> = ({ testDrop }) => {
  const { selectedSong } = usePhraser();
  const { notifications } = useNotification();

  const onDrop = useCallback((dropResult: DropResult) => {
    const { destination, source, draggableId } = dropResult;

    if (destination) {
      // CASE: ADD Template
      if (source.droppableId === TEMPLATES && destination.droppableId !== TEMPLATES) {
        addPhraserSongPartRhyme({ templateId: draggableId }, destination);
        return;
      }

      // CASE: Add Snippet
      if (source.droppableId === SNIPPETS && destination.droppableId !== SNIPPETS) {
        addPhraserSongPartRhyme({ snippetId: draggableId }, destination);
        return;
      }

      // CASE: REORDER snippet
      if (source.droppableId === SNIPPETS && destination.droppableId === SNIPPETS) {
        reorderSnippet(source, destination);
        return;
      }

      // CASE: REORDER inside a song-part
      if (
        destination.droppableId === source.droppableId &&
        source.droppableId !== SNIPPETS &&
        source.droppableId !== TEMPLATES
      ) {
        reorderPhraserSongPartRhyme(source, destination);
        return;
      }

      // CASE: Move Rhyme from one part to another Part
      if (
        destination.droppableId !== SNIPPETS &&
        destination.droppableId !== TEMPLATES &&
        source.droppableId !== SNIPPETS &&
        source.droppableId !== TEMPLATES
      ) {
        movePhraserSongPartRhyme(source, destination);
      }
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
            <SongParts />
          </If>
        </GridContent>

        <GridTabs
          tabs={[
            { name: 'Templates', component: <Templates /> },
            { name: 'Snippets', component: <Snippets /> },
            { name: 'Library', component: <Library /> },
            { name: 'Changes', component: <Changes /> },
            { name: 'Notifications', component: <Notifications />, count: notifications.length }
          ]}
          initialTab={0}
        />
      </DragDropContext>
    </Grid>
  );
};

export default Phraser;
