import React, { FC, useEffect } from 'react';
import { Gain, ToneBufferSource } from 'tone';

import FileDropZone from '../../component/file-drop-zone';
import { SSlicer } from './styled';
import { useStore } from '../../store';
import AudioVisualizer from '../../component/audio-visualizer';

const Slicer: FC = () => {
  const file = useStore(state => state.slicer.selectedFile);

  useEffect(() => {
    if (file?.audio) {
      const { buffer } = file.audio;

      // TODO: Clean up
      const toneBufferSource = new ToneBufferSource(buffer);
      const gainNode = new Gain(1).toDestination();
      toneBufferSource.connect(gainNode);
      // toneBufferSource.start(0);
      // gainNode.toDestination();
    }
  }, [file]);

  return (
    <SSlicer>
      <FileDropZone />
      <div className="content">
        {/* Visualizer */}
        <div className="visualizer">{file && <AudioVisualizer file={file} areaSelection />}</div>
      </div>
    </SSlicer>
  );
};

export default Slicer;
