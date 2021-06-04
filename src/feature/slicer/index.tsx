import React, { FC } from 'react';

import DropZone from './drop-zone';
import Info from './info';
import Visualizer from './visualizer';
import Hint from './hint';

import { SSlicer } from './styled';

const Slicer: FC = () => {
  // TODO: Clean up
  // useEffect(() => {
  //   if (file?.audio) {
  //     const { buffer } = file.audio;
  //
  //     const toneBufferSource = new ToneBufferSource(buffer);
  //     const gainNode = new Gain(1).toDestination();
  //     toneBufferSource.connect(gainNode);
  //     toneBufferSource.start(0);
  //     gainNode.toDestination();
  //   }
  // }, [file]);

  return (
    <SSlicer>
      <DropZone />

      <div className="wrapper">
        <div className="content">
          <Info />
          <Visualizer />
          <Hint />
        </div>
      </div>
    </SSlicer>
  );
};
export default Slicer;
