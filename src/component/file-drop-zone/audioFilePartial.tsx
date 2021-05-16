import React, { FC, useCallback, useState } from 'react';

import { bytesToMegaBytes } from '../../util';
import { SAudioFile } from './styled';
import Icon from '../icon';
import { AudioFile } from '../../store/types';
import { AudioType } from '../../audio/types';
import { getAudioType, removeAudioFileTypeFromName } from '../../audio';

interface Props {
  file: AudioFile;
  isSelected: boolean;
  onClick: (file: AudioFile) => void;
}

const AudioFilePartial: FC<Props> = ({ file, onClick, isSelected }) => {
  const [audioType] = useState<AudioType | null>(getAudioType(file.type));

  const onFileClick = useCallback(() => onClick(file), [file, onClick]);

  return (
    <SAudioFile className={`${isSelected && 'selected'}`} onClick={onFileClick}>
      {audioType && <Icon iconType={audioType} />}
      <div className="info">
        <span className="name">{removeAudioFileTypeFromName(file.name)}</span>
        <span className="size">{bytesToMegaBytes(file.size)}</span>
      </div>
    </SAudioFile>
  );
};

export default AudioFilePartial;
