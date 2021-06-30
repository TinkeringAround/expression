import React, { FC, useCallback } from 'react';

import { getAudioType, removeAudioFileTypeFromName } from '../../../lib/audio';
import { selectSlicerFile } from '../../../store/slicer/selector';
import { asSeconds, toMB } from '../../../lib/util';
import { useSlicer } from '../../../store/slicer';

import Icon from '../../../component/icon';
import STag from '../../../component/tag';

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
        {isShowing() && <STag>{toMB(size)}</STag>}
        {isShowing() && <STag>{`~ ${asSeconds(buffer.duration, 0)}`}</STag>}
      </div>
    </SInfo>
  );
};

export default Info;
