import React, { FC, useCallback, useEffect, useState } from 'react';
import { Player, Time, Transport } from 'tone';

import { createPlayer } from '../../../lib/player';
import { useSlicer } from '../../../store/slicer';
import { floatsDiffer } from '../../../lib/util';
import { updateSlicerIsPlaying } from '../../../store/slicer/actions';

import Control from '../../control';

import { SSlicerControls } from './styled';

const SlicerControls: FC = () => {
  const { file, selection, isPlaying, isExporting } = useSlicer();
  const [player] = useState<Player>(createPlayer());

  const playPauseType = isPlaying ? 'pause' : 'play';
  const disabled = !file || isExporting;

  const onFirst = useCallback(() => {
    Transport.seconds = Time(Transport.loopStart).toSeconds();
  }, []);

  const onBackward = useCallback(() => {
    const stepBackIsBelowLoopStart = Transport.seconds - 1 < Transport.loopStart;
    Transport.seconds = stepBackIsBelowLoopStart
      ? Time(Transport.loopStart).toSeconds()
      : Transport.seconds - 1;
  }, []);

  const onPlayPause = useCallback(() => {
    updateSlicerIsPlaying(!isPlaying);
  }, [isPlaying]);

  const onStop = useCallback(() => {
    Transport.seconds = Time(Transport.loopStart).toSeconds();
    updateSlicerIsPlaying(false);
  }, []);

  const onForward = useCallback(() => {
    Transport.seconds = Transport.seconds + 1;
  }, []);

  const onLast = useCallback(() => {
    Transport.seconds = Time(Transport.loopEnd).toSeconds() - 0.01;
    updateSlicerIsPlaying(false);
  }, []);

  useEffect(() => {
    if (file && player) {
      if (Transport.state === 'started') {
        Transport.pause();
        updateSlicerIsPlaying(false);

        player.seek(0, 0);
        player.buffer = file.buffer;

        Transport.seconds = 0;
      } else {
        // stopped or paused
        Transport.seconds = 0;

        player.buffer = file.buffer;
        player.start(0);
      }
    }
  }, [file, player]);

  useEffect(() => {
    const { start, end, offset } = selection;
    const loopStart = Time(start + offset).toSeconds();
    const loopEnd = Time(end + offset).toSeconds();
    const currentLoopStart = Time(Transport.loopStart).toSeconds();
    const currentLoopEnd = Time(Transport.loopEnd).toSeconds();
    const currentSeconds = Transport.seconds; // separate variable for testing purpose

    if (!Transport.loop) {
      Transport.loop = true;
    }

    if (floatsDiffer(currentLoopStart, loopStart)) {
      Transport.loopStart = loopStart;
    }

    if (floatsDiffer(currentLoopEnd, loopEnd)) {
      Transport.loopEnd = loopEnd;
    }

    if (currentSeconds < loopStart) {
      Transport.seconds = loopStart;
    }

    if (currentSeconds > loopEnd) {
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
    </SSlicerControls>
  );
};

export default SlicerControls;
