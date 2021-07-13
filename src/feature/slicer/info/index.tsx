import React, { FC, useCallback } from 'react';

import { getAudioType, removeAudioFileTypeFromName } from '../../../lib/audio';
import { selectSlicerFile } from '../../../store/slicer/selector';
import { asSeconds, toMB } from '../../../lib/util';
import { useSlicer } from '../../../store/slicer';

import Icon from '../../../component/icon';
import Tag from '../../../component/tag';

import { SInfo } from './styled';

const Info: FC = () => {
  const { type, name, size, buffer } = useSlicer(selectSlicerFile);

  const isShowing = useCallback(() => size > 0 && buffer.duration > 0, [size, buffer]);

  return (
    <SInfo>
      <div className="aboutFileName">
        <Icon iconType={getAudioType(type)} />
        <h1>{removeAudioFileTypeFromName(name)}</h1>
      </div>

      <div className="aboutFileSize">
        {isShowing() && <Tag>{toMB(size)}</Tag>}
        {isShowing() && <Tag>{`~ ${asSeconds(buffer.duration, 0)}`}</Tag>}
      </div>
    </SInfo>
  );
};

export default Info;
