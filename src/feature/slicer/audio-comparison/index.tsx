import React, { FC } from 'react';

import { bytesToMegaBytes } from '../../../util';
import { AudioFile } from '../../../store/types';

import Icon from '../../../component/icon';
import { SAudioComparison } from './styled';

interface Props {
  audioLeft: AudioFile;
  audioRight: AudioFile;
}

const AudioComparison: FC<Props> = ({ audioLeft, audioRight }) => {
  const byteLengthChanged = audioLeft.size !== audioRight.size;
  const durationChanged =
    audioLeft.audio?.buffer.duration.toFixed(0) !== audioRight.audio?.buffer.duration.toFixed(0);
  const thereAreDiffs = byteLengthChanged || durationChanged;

  return (
    <SAudioComparison>
      <div className="left">
        {/* File Size */}
        <label>File Size</label>
        <span>{`${bytesToMegaBytes(audioLeft.size)}`}</span>

        {/* Duration in Seconds */}
        <label>Duration</label>
        <span>{`${audioLeft.audio?.buffer.duration.toFixed(0)}s`}</span>
      </div>

      {thereAreDiffs && (
        <div className="transition">
          <Icon iconType="comparison" />
        </div>
      )}

      {thereAreDiffs && (
        <div className="right">
          {/* File Size */}
          <label>File Size</label>
          <span className={`${byteLengthChanged ? 'changed' : ''}`}>
            {`${bytesToMegaBytes(audioRight.size)} (estimated)`}
          </span>

          {/* Duration in Seconds */}
          <label>Duration</label>
          <span className={`${durationChanged ? 'changed' : ''}`}>
            {`${audioRight.audio?.buffer.duration.toFixed(0)}s`}
          </span>
        </div>
      )}
    </SAudioComparison>
  );
};

export default AudioComparison;
