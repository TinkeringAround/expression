import React, { FC, useCallback, useState } from 'react';

import { AudioFile } from '../../../../store/slicer/types';
import { AudioType } from '../../../../lib/audio/types';
import { getAudioType, removeAudioFileTypeFromName } from '../../../../lib/audio';
import { removeSlicerFile } from '../../../../store/slicer/actions';

import Icon from '../../../../component/icon';

import { SDropZoneFile } from './styled';

interface Props {
  file: AudioFile;
  isSelected: boolean;
  onClick: (file: AudioFile) => void;
}

const DropZoneFile: FC<Props> = ({ file, onClick, isSelected }) => {
  const [audioType] = useState<AudioType | null>(getAudioType(file.type));

  const onFileClick = useCallback(() => onClick(file), [file, onClick]);
  const onFileDeleteClick = useCallback(() => removeSlicerFile(file), [file]);

  return (
    <SDropZoneFile
      className={`${isSelected && 'selected'}`}
      onClick={({ target }) => {
        // if trash icon includes trash
        if ((target as HTMLDivElement).className.includes('trash')) onFileDeleteClick();
        else onFileClick();
      }}
    >
      <Icon iconType="trash" />
      {audioType && <Icon iconType={audioType} />}
      <div className="info" onClick={onFileClick}>
        <span className="name">{removeAudioFileTypeFromName(file.name)}</span>
      </div>
    </SDropZoneFile>
  );
};

export default DropZoneFile;
