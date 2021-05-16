import React, { FC, useEffect } from 'react';
import { Gain, ToneBufferSource } from 'tone';

import FileDropZone from '../../component/file-drop-zone';
import AudioVisualizer from '../../component/audio-visualizer';
import Icon from '../../component/icon';

import { SSlicer } from './styled';
import { useStore } from '../../store';
import { bytesToMegaBytes } from '../../util';
import { getAudioType, removeAudioFileTypeFromName } from '../../audio';

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
        {/* Header */}
        {file && (
          <header>
            <div>
              <h1>{removeAudioFileTypeFromName(file.name)}</h1>
              {<Icon iconType={getAudioType(file.type)} />}
            </div>
            <span>{`Dateigröße: ${bytesToMegaBytes(file.size)}`}</span>
          </header>
        )}

        {/* Visualizer */}
        <div className="visualizer">{file && <AudioVisualizer file={file} />}</div>
      </div>
    </SSlicer>
  );
};

export default Slicer;
