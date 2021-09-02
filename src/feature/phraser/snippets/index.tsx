import React, { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { useSnippet } from '../../../store/snippet';

import If from '../../../component/if';
import For from '../../../component/for';

import { SSnippet, SSnippets } from './styled';

export const SNIPPETS = 'snippets';

const Snippets: FC = () => {
  const { snippets } = useSnippet();
  const hasSnippets = snippets.length > 0;

  return (
    <Droppable droppableId={SNIPPETS}>
      {({ placeholder, innerRef, droppableProps }) => (
        <SSnippets ref={innerRef} {...droppableProps}>
          <h1>Snippets</h1>
          <p>Drag Snippets of Rhymes to parts of a selected song.</p>
          <If condition={!hasSnippets}>
            <p>No Snippets yet.</p>
          </If>
          <For
            values={snippets}
            projector={(snippet, index) => (
              <Draggable key={snippet.id} draggableId={snippet.id} index={index}>
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <SSnippet ref={innerRef} {...draggableProps} {...dragHandleProps}>
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
