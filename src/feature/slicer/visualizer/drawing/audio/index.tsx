import React, { FC } from 'react';

import { SAudio } from './styled';

const PADDING_BOTTOM = 50;

interface Props {
  points: string;
  zoom: number;
  height: number;
}

const Audio: FC<Props> = ({ points, zoom, height }) => (
  <SAudio role="audio" style={{ height: height - PADDING_BOTTOM, width: `${100 * zoom}%` }}>
    <polyline role="channel" points={points} />
  </SAudio>
);

export default Audio;
