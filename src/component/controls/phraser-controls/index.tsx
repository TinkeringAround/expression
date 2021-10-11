import React, { FC, useCallback } from 'react';

import { usePhraser } from '../../../store/phraser';
import { setKaraokeMode } from '../../../store/phraser/actions';

import Control from '../../control';

import { SControls } from '../styled';

const PhraserControls: FC = () => {
  const { selectedSong } = usePhraser();

  const enterKaraokeMode = useCallback(() => {
    setKaraokeMode(true);
  }, []);

  return (
    <SControls>
      <Control
        title="Enter Karaoke Mode"
        keyboard="F"
        withCtrl
        type="karaoke"
        onClick={enterKaraokeMode}
        disabled={!selectedSong}
      />
    </SControls>
  );
};

export default PhraserControls;
