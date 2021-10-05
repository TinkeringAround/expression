import React, { FC, useCallback, useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { useSnippet } from '../../../store/snippet';
import { deleteSnippet } from '../../../store/snippet/actions';
import { Snippet } from '../../../store/snippet/types';
import { useDebounce } from '../../../hook/useDebounce';

import If from '../../../component/if';
import For from '../../../component/for';
import Icon from '../../../component/icon';
import Input from '../../../component/input';

import { SSnippet, SSnippets } from './styled';

export const SNIPPETS = 'snippets';

const Snippets: FC = () => {
  const { snippets } = useSnippet();
  const [search, setSearch] = useState<string>('');
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>(snippets);

  const debouncedSearch = useDebounce(search.toLowerCase(), 250);
  const hasSnippets = snippets.length > 0;

  const onDelete = useCallback((snippetId: string) => {
    deleteSnippet(snippetId);
  }, []);

  const onSearch = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(value);
    },
    [setSearch]
  );

  const onReset = useCallback(() => {
    setSearch('');
  }, [setSearch]);

  useEffect(() => {
    const newFilteredSnippets = snippets.filter(snippet =>
      snippet.lines.some(line => line.toLowerCase().includes(debouncedSearch))
    );
    setFilteredSnippets(newFilteredSnippets);
  }, [snippets, debouncedSearch, setFilteredSnippets]);

  return (
    <Droppable droppableId={SNIPPETS}>
      {({ placeholder, innerRef, droppableProps }) => (
        <SSnippets ref={innerRef} {...droppableProps}>
          <h1>Snippets</h1>
          <div className="controls">
            <Input
              value={search}
              placeholder="Enter Search..."
              onChange={onSearch}
              reset={onReset}
            />
          </div>
          <p>
            <If condition={hasSnippets}>Drag Snippets of Rhymes to parts of a selected song.</If>
            <If condition={!hasSnippets}>
              No Snippets.
              <br />
              Create some when editing songs.
            </If>
          </p>
          <div className="content">
            <For
              values={filteredSnippets}
              projector={(snippet, index) => (
                <Draggable key={snippet.id} draggableId={snippet.id} index={index}>
                  {({ innerRef, draggableProps, dragHandleProps }) => (
                    <SSnippet ref={innerRef} {...draggableProps} {...dragHandleProps}>
                      <Icon
                        title="Delete Snippet"
                        iconType="trash"
                        onClick={() => onDelete(snippet.id)}
                      />
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
          </div>
          {placeholder}
        </SSnippets>
      )}
    </Droppable>
  );
};

export default Snippets;
