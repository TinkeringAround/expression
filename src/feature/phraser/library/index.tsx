import React, { FC, useCallback, useEffect, useState } from 'react';

import { useLibrary } from '../../../store/library';
import { useDebounce } from '../../../hook/useDebounce';
import { getSuggestion } from '../../../store/library/actions';
import { LANGUAGES, WordSuggestions } from '../../../store/library/types';

import For from '../../../component/for';
import If from '../../../component/if';
import Input from '../../../component/input';

import { SLibrary, SLibrarySuggestion } from './styled';

const Library: FC = () => {
  const { library } = useLibrary();
  const [search, setSearch] = useState<string>('');
  const [suggestions, setSuggestions] = useState<WordSuggestions>({});

  const debouncedSearch = useDebounce(search.toLowerCase(), 200);

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
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch === '') {
      setSuggestions({});
      return;
    }

    const suggestionsForSearch = library[debouncedSearch];
    if (suggestionsForSearch) {
      setSuggestions(suggestionsForSearch);
    }
  }, [library, debouncedSearch, setSuggestions]);

  return (
    <SLibrary>
      <h1>Library</h1>
      <div className="controls">
        <Input value={search} placeholder="Enter Search..." onChange={onSearch} reset={onReset} />
      </div>
      <p>Search words to use in your songs.</p>
      <div className="content">
        <For
          values={Object.keys(suggestions)}
          projector={lang => (
            <If key={`lib-${lang}`} condition={suggestions[lang].length > 0}>
              <SLibrarySuggestion>
                <h2>{LANGUAGES[lang]}</h2>
                <For
                  values={suggestions[lang]}
                  projector={(suggestion, index) => (
                    <span key={`lib-${lang}-${index}`}>{suggestion}</span>
                  )}
                />
              </SLibrarySuggestion>
            </If>
          )}
        />
      </div>
    </SLibrary>
  );
};

export default Library;
