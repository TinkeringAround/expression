import React, { FC, useEffect, useRef, useState } from 'react';

import { drawAudio } from './visualizer';
import { SAudioVisualizer } from './styled';
import { normalizeData } from '../../../audio';

interface Props {
  channelData: Float32Array[];
}

const AudioVisualizerCanvas: FC<Props> = ({ channelData }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [samples] = useState<number>(5000);

  useEffect(() => {
    if (canvas.current && channelData.length > 0) {
      drawAudio(canvas.current, normalizeData(channelData[0], samples));
    }
  }, [channelData, samples]);

  return <SAudioVisualizer ref={canvas} />;
};

export default AudioVisualizerCanvas;
