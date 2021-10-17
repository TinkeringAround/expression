import React, { FC, useCallback, useEffect, useState } from 'react';

import { useDebounce } from '../../../hook/useDebounce';
import { getSuggestion } from '../../../store/library/actions';

import For from '../../../component/for';
import Input from '../../../component/input';

import { SLibrary, SLibrarySuggestion } from './styled';
import { useLibrary } from '../../../store/library';

export const SNIPPETS = 'snippets';

const Library: FC = () => {
  const {library} = useLibrary();
  const [search, setSearch] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const debouncedSearch = useDebounce(search, 500);

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
    getSuggestion(debouncedSearch);
  }, [debouncedSearch, setSuggestions]);

  useEffect(() => {
    const suggestionsForSearch = library[debouncedSearch];
    if (suggestionsForSearch) {
      setSuggestions(suggestionsForSearch)
    }
  }, [library, debouncedSearch, setSuggestions])

  return (
    <SLibrary>
      <h1>Library</h1>
      <div className='controls'>
        <Input
          value={search}
          placeholder='Enter Search...'
          onChange={onSearch}
          reset={onReset}
        />
      </div>
      <p>
        Search for words to use in your songs.
      </p>
      <div className='content'>
        <For
          values={suggestions}
          projector={(snippet, index) => (
            <SLibrarySuggestion key={`library-entry-${index}`}>
              <p>
                Test
              </p>
            </SLibrarySuggestion>
          )}
        />
      </div>
    </SLibrary>
  );
};

export default Library;
