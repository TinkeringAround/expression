import React, { FC, Fragment } from 'react';

import { AudioFile } from '../../store/types';
import AudioVisualizerAreaSelection from './audio-visualizer-area-selection';
import AudioVisualizerCanvas from './audio-visualizer-canvas';

interface Props {
  file: AudioFile;
  areaSelection?: boolean;
}

const AudioVisualizer: FC<Props> = ({ file, areaSelection = true }) => {
  return (
    <Fragment>
      {areaSelection && file.audio && <AudioVisualizerAreaSelection />}
      {file.audio && <AudioVisualizerCanvas channelData={file.audio.channelData} />}
    </Fragment>
  );
};
export default AudioVisualizer;
