import React, { FC, useCallback } from 'react';

import { useSlicer } from '../../../store/slicer';

import Control from '../../control';
import Icon from '../../icon';
import Shortcut from '../../shortcut';
import SButton from '../../button';

import { SSlicerControls } from './styled';

const SlicerControls: FC = () => {
  const { file } = useSlicer();

  const playPauseType = 'play';
  const disabled = !file;

  const onFirst = useCallback(() => console.log('first'), []);
  const onPlayPause = useCallback(() => console.log('play or pause'), []);
  const onStop = useCallback(() => console.log('stop'), []);
  const onLast = useCallback(() => console.log('last'), []);
  const onExport = useCallback(() => console.log('export'), []);

  return (
    <SSlicerControls>
      <Control type="first" onClick={onFirst} disabled={disabled} />
      <Control type={playPauseType} disabled={disabled} onClick={onPlayPause} />
      <Control type="stop" disabled={disabled} onClick={onStop} />
      <Control type="last" disabled={disabled} onClick={onLast} />

      <SButton disabled={disabled} onClick={onExport}>
        <Icon iconType="save" />
        <span>Export</span>
        <Shortcut keyboard="E" withCtrl disabled={disabled} onClick={onExport} />
      </SButton>
    </SSlicerControls>
  );
};

export default SlicerControls;
