import React, { FC, useEffect, useState } from 'react';
import { Transport } from 'tone';

import { useSlicer } from '../../../../../store/slicer';

import { SMarker } from './styled';

const Marker: FC = () => {
  const { file } = useSlicer();

  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    let handler: NodeJS.Timeout;
    // set repeat to keep track on progress in percent
    Transport.on('start', () => {
      handler = setInterval(() => {
        setPosition(Transport.progress * 100);
      }, 100);
    });

    Transport.on('pause', () => {
      // cancel all scheduled repeats
      setPosition(Transport.progress * 100);
      handler && clearInterval(handler);
    });

    Transport.on('loopStart', () => {
      setPosition(Transport.progress * 100);
    });

    Transport.on('loopEnd', () => {
      setPosition(Transport.progress * 100);
    });
  }, []);

  useEffect(() => {
    if (position > 100) setPosition(100);
    else if (position < 0) setPosition(0);
  }, [position, setPosition]);

  useEffect(() => {
    setPosition(Transport.progress * 100);
  }, [file, setPosition]);

  return <SMarker role="marker" style={{ left: `${position}%` }} />;
};

export default Marker;
