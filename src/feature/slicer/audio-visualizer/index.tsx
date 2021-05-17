import React, { FC, Fragment } from 'react';

import { AudioFile } from '../../../store/types';

import AreaSelection from './area-selection';
import Canvas from './canvas';

interface Props {
  file: AudioFile;
  areaSelection?: boolean;
}

const AudioVisualizer: FC<Props> = ({ file, areaSelection = true }) => {
  return (
    <Fragment>
      {areaSelection && file.audio && <AreaSelection />}
      {file.audio && <Canvas channelData={file.audio.channelData} />}
    </Fragment>
  );
};
export default AudioVisualizer;
