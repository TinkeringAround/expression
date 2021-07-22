import React, { FC, useCallback } from 'react';

import {
  getAudioType,
  removeAudioFileFromPath,
  removeAudioFileTypeFromName
} from '../../../lib/audio';
import { selectSlicerFile } from '../../../store/slicer/selector';
import { asSeconds, toMB } from '../../../lib/util';
import { useSlicer } from '../../../store/slicer';
import { useClipboard } from '../../../hook/useClipboard';
import { addNotification } from '../../../store/notification/actions';

import Icon from '../../../component/icon';
import Tag from '../../../component/tag';
import If from '../../../component/if';

import { SInfo } from './styled';

const Info: FC = () => {
  const { type, name, size, buffer, path } = useSlicer(selectSlicerFile);
  const { copy } = useClipboard();

  const isShowing = useCallback(() => size > 0 && buffer.duration > 0, [size, buffer]);

  const onCopy = useCallback(async () => {
    const success = await copy(removeAudioFileFromPath(path));
    addNotification({
      type: success ? 'info' : 'error',
      content: success ? 'Path successfully copied.' : 'Could not copy path to clipboard.'
    });
  }, [path, copy]);

  return (
    <SInfo>
      <div className="aboutFileName" onClick={onCopy}>
        <Icon iconType={getAudioType(type)} />
        <h1 title={removeAudioFileTypeFromName(name)}>{removeAudioFileTypeFromName(name)}</h1>
      </div>

      <div className="aboutFileSize">
        <If condition={isShowing()}>
          <Tag>{toMB(size)}</Tag>
          <Tag>{`~ ${asSeconds(buffer.duration, 0)}`}</Tag>
        </If>
      </div>
    </SInfo>
  );
};

export default Info;
