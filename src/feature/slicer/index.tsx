import React, { FC, useEffect } from 'react';
import { Gain, ToneBufferSource } from 'tone';

import { useStore } from '../../store';
import { getAudioType, removeAudioFileTypeFromName } from '../../audio';
import { AudioFile } from '../../store/types';

import AudioDropZone from './audio-drop-zone';
import AudioVisualizer from './audio-visualizer';
import Icon from '../../component/icon';
import AudioComparison from './audio-comparison';
import { SSlicer } from './styled';

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

  /**
   * Display Information for an Audio File
   */
  const Info = (file: AudioFile) => (
    <section className="slicer-info">
      <div>
        {<Icon iconType={getAudioType(file.type)} />}
        <h1>{removeAudioFileTypeFromName(file.name)}</h1>
      </div>

      {/* Audio Comparison */}
      <AudioComparison audioLeft={file} audioRight={file} />
    </section>
  );

  /**
   * Visualization of an Audio File
   */
  const Visualizer = (file: AudioFile) => (
    <section className="slicer-visualizer">
      <AudioVisualizer file={file} />
    </section>
  );

  return (
    <SSlicer>
      <AudioDropZone />

      <div className="content">
        {file && Info(file)}
        {file && Visualizer(file)}
      </div>
    </SSlicer>
  );
};

export default Slicer;
