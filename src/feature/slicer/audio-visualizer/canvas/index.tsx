import React, { FC, useEffect, useRef, useState } from 'react';

import { drawAudio } from './visualizer';
import { normalizeData } from '../../../../audio';

import { SCanvas } from './styled';

interface Props {
  channelData: Float32Array[];
}

const Canvas: FC<Props> = ({ channelData }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [samples] = useState<number>(100);

  useEffect(() => {
    if (canvas.current && channelData.length > 0) {
      drawAudio(canvas.current, normalizeData(channelData[0], samples));
    }
  }, [channelData, samples]);

  return <SCanvas ref={canvas} />;
};

export default Canvas;
