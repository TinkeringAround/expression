import React, { FC, useCallback, useEffect, useState } from 'react';
import { Player, Time, Transport } from 'tone';

import { createPlayer } from '../../../lib/player';
import { useSlicer } from '../../../store/slicer';

import Control from '../../control';
import Icon from '../../icon';
import Shortcut from '../../shortcut';
import SButton from '../../button';

import { SSlicerControls } from './styled';

const SlicerControls: FC = () => {
  const { file, selection } = useSlicer();

  const [player] = useState<Player>(createPlayer());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playPauseType = isPlaying ? 'pause' : 'play';
  const disabled = !file;

  const onFirst = useCallback(() => {
    Transport.seconds = Time(Transport.loopStart).toSeconds();
  }, []);

  const onBackward = useCallback(() => {
    Transport.seconds =
      Transport.seconds - 1 < Transport.loopStart
        ? Time(Transport.loopStart).toSeconds()
        : Transport.seconds - 1;
  }, []);

  const onPlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  const onStop = useCallback(() => {
    Transport.seconds = Time(Transport.loopStart).toSeconds();
    setIsPlaying(false);
  }, [setIsPlaying]);

  const onForward = useCallback(() => {
    Transport.seconds = Transport.seconds + 1;
  }, []);

  const onLast = useCallback(() => {
    Transport.seconds = Time(Transport.loopEnd).toSeconds() - 0.01;
    setIsPlaying(false);
  }, [setIsPlaying]);

  const onExport = useCallback(() => console.log('export'), []);

  useEffect(() => {
    if (file && player) {
      Transport.stop();
      const startTime = Transport.seconds < 0 ? 0 : Transport.seconds;

      player.state === 'started' && player.stop();
      player.buffer = file.buffer;
      player.state === 'stopped' && player.start(startTime);
    }
  }, [file, player, setIsPlaying]);

  useEffect(() => {
    setIsPlaying(false);
  }, [file, setIsPlaying]);

  useEffect(() => {
    const { start, end, offset } = selection;
    const loopStart = start < 0 ? offset : start + offset;
    const loopEnd = end < 0 ? offset : end + offset;

    Transport.loop = true;
    Transport.setLoopPoints(loopStart, loopEnd);

    if (Transport.seconds < loopStart) {
      Transport.seconds = loopStart;
    } else if (Transport.seconds > loopEnd) {
      Transport.seconds = loopEnd;
    }
  }, [selection]);

  useEffect(() => {
    if (isPlaying) Transport.start();
    else Transport.pause();
  }, [isPlaying]);

  return (
    <SSlicerControls>
      <Control keyboard="ArrowLeft" withCtrl type="first" onClick={onFirst} disabled={disabled} />
      <Control keyboard="ArrowLeft" type="backward" onClick={onBackward} disabled={disabled} />
      <Control keyboard="Space" type={playPauseType} disabled={disabled} onClick={onPlayPause} />
      <Control keyboard="Space" withCtrl type="stop" disabled={disabled} onClick={onStop} />
      <Control keyboard="ArrowRight" type="foreward" onClick={onForward} disabled={disabled} />
      <Control keyboard="ArrowRight" withCtrl type="last" disabled={disabled} onClick={onLast} />

      <SButton disabled={disabled} onClick={onExport}>
        <Icon iconType="save" />
        <span>Export</span>
        <Shortcut keyboard="E" withCtrl disabled={disabled} onClick={onExport} />
      </SButton>
    </SSlicerControls>
  );
};

export default SlicerControls;
