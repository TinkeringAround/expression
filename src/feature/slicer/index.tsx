import React, { FC } from 'react';

import { useStore } from '../../store';
import { getAudioType, removeAudioFileTypeFromName } from '../../audio';
import { SlicerAudioFile } from '../../store/types';
import { bytesToMegaBytes } from '../../util';

import DropZone from './drop-zone';
import Visualizer from './visualizer';
import Icon from '../../component/icon';
import { SSlicer } from './styled';
import { STag } from '../../component';

const Slicer: FC = () => {
  const file = useStore(state => state.slicer.file);

  // Display Information for an Audio File
  const Info = (file: SlicerAudioFile) => (
    <section className="info">
      <div className="aboutFileName">
        {<Icon iconType={getAudioType(file.type)} />}
        <h1>{removeAudioFileTypeFromName(file.name)}</h1>
      </div>
      <div className="aboutFileSize">
        <STag>{bytesToMegaBytes(file.size)}</STag>
        <STag>{`~ ${file.buffer.duration.toFixed(0)}s`}</STag>
      </div>
    </section>
  );

  // Visualization of an Audio File
  const AudioVisualizer = () => (
    <section className="visualizer">
      <Visualizer />
    </section>
  );

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

      <div className="content">
        <div className="editor">
          {file && Info(file)}
          {file && AudioVisualizer()}
        </div>
      </div>
    </SSlicer>
  );
};

export default Slicer;
