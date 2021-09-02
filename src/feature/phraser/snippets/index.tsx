import React, { FC, useCallback } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { useSnippet } from '../../../store/snippet';
import { deleteSnippet } from '../../../store/snippet/actions';

import If from '../../../component/if';
import For from '../../../component/for';
import Icon from '../../../component/icon';

import { SSnippet, SSnippets } from './styled';

export const SNIPPETS = 'snippets';

const Snippets: FC = () => {
  const { snippets } = useSnippet();
  const hasSnippets = snippets.length > 0;

  const onDelete = useCallback((snippetId: string) => {
    deleteSnippet(snippetId);
  }, []);

  return (
    <Droppable droppableId={SNIPPETS}>
      {({ placeholder, innerRef, droppableProps }) => (
        <SSnippets ref={innerRef} {...droppableProps}>
          <h1>Snippets</h1>
          <p>
            <If condition={hasSnippets}>Drag Snippets of Rhymes to parts of a selected song.</If>
            <If condition={!hasSnippets}>No Snippets yet.</If>
          </p>
          <For
            values={snippets}
            projector={(snippet, index) => (
              <Draggable key={snippet.id} draggableId={snippet.id} index={index}>
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <SSnippet ref={innerRef} {...draggableProps} {...dragHandleProps}>
                    <Icon iconType="trash" onClick={() => onDelete(snippet.id)} />
                    <p>
                      {snippet.lines.map((line, lineIndex) => (
                        <span key={`line-${lineIndex}`}>{line}</span>
                      ))}
                    </p>
                  </SSnippet>
                )}
              </Draggable>
            )}
          />
          {placeholder}
        </SSnippets>
      )}
    </Droppable>
  );
};

export default Snippets;
