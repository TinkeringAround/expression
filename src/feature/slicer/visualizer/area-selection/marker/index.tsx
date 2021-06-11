import React, { FC } from 'react';

import { usePlayer } from '../../../../../store/player';

import { SMarker } from './styled';

const Marker: FC = () => {
  const { marker } = usePlayer();

  return <SMarker style={{ left: `${marker}%` }} />;
};

export default Marker;
