import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

import { usePhraser } from '../../../store/phraser';
import {
  addPhraserSongPart,
  deletePhraserCollectionSong,
  updatePhraserSongTitle
} from '../../../store/phraser/actions';

import For from '../../../component/for';
import If from '../../../component/if';
import Icon from '../../../component/icon';
import Confirmation from '../../../component/confirmation';

import SongPart from './song-part';
import { SParts } from './styled';

const SongParts: FC = () => {
  const { selectedSong } = usePhraser();
  const [songTitle, setSongTitle] = useState<string>(selectedSong?.title ?? '');
  const [confirmation, setConfirmation] = useState(false);

  const onChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSongTitle(value);
    },
    [setSongTitle]
  );

  const updateTitle = useCallback(() => {
    if (selectedSong?.title !== songTitle) {
      updatePhraserSongTitle(songTitle);
    }
  }, [selectedSong, songTitle]);

  const requestSongDeletion = useCallback(() => {
    setConfirmation(true);
  }, [setConfirmation]);

  const confirmSongDeletion = useCallback(() => {
    deletePhraserCollectionSong();
  }, []);

  const cancelSongDeletion = useCallback(() => {
    setConfirmation(false);
  }, [setConfirmation]);

  const addPart = useCallback(() => {
    addPhraserSongPart();
  }, []);

  useEffect(() => {
    selectedSong?.title && setSongTitle(selectedSong.title);
  }, [selectedSong, setSongTitle]);

  return (
    <SParts>
      <Confirmation
        visible={confirmation}
        content="Delete song?"
        onConfirmation={confirmSongDeletion}
        onCancel={cancelSongDeletion}
      />
      <If condition={!!selectedSong}>
        <header>
          <input
            className="song-name"
            spellCheck={false}
            title={songTitle}
            value={songTitle}
            onChange={onChange}
            onBlur={updateTitle}
          />
          <Icon iconType="trash" title="Delete Song" onClick={requestSongDeletion} />
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

export default SongParts;
