import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

import { usePhraser } from '../../../store/phraser';
import { selectSelectedSongIsDirty } from '../../../store/phraser/selector';
import { addPhraserSongPart, updatePhraserSongTitle } from '../../../store/phraser/actions';

import For from '../../../component/for';
import If from '../../../component/if';

import SongPart from './part';
import { SEdited, SParts } from './styled';

const Parts: FC = () => {
  const { selectedSong } = usePhraser();
  const isDirty = usePhraser(selectSelectedSongIsDirty);
  const [songTitle, setSongTitle] = useState<string>(selectedSong?.title ?? '');

  const onChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSongTitle(value);
    },
    [songTitle, setSongTitle]
  );

  const updateTitle = useCallback(() => {
    if (selectedSong?.title !== songTitle) {
      updatePhraserSongTitle(songTitle);
    }
  }, [selectedSong, songTitle]);

  const addPart = useCallback(() => {
    addPhraserSongPart();
  }, []);

  useEffect(() => {
    selectedSong?.title && setSongTitle(selectedSong.title);
  }, [selectedSong, setSongTitle]);

  return (
    <SParts>
      <If condition={!!selectedSong}>
        <header>
          <input
            className="song-name"
            title={songTitle}
            value={songTitle}
            onChange={onChange}
            onBlur={updateTitle}
          />
          <If condition={isDirty}>
            <SEdited>DRAFT</SEdited>
          </If>
        </header>
      </If>
      <For
        values={selectedSong?.parts ?? []}
        projector={part => <SongPart key={part.id} part={part} />}
      />
      <footer>
        <button onClick={addPart}>Add Part</button>
      </footer>
    </SParts>
  );
};

export default Parts;
