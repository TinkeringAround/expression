import React, { FC, useCallback, useEffect } from 'react';
import { Time, Transport } from 'tone';

import { useSlicer } from '../../../store/slicer';
import { usePlayer } from '../../../store/player';
import { updateIsPlaying, updateMarker } from '../../../store/player/actions';

import Control from '../../control';
import Icon from '../../icon';
import Shortcut from '../../shortcut';
import SButton from '../../button';

import { SSlicerControls } from './styled';

const SlicerControls: FC = () => {
  const { file, selection } = useSlicer();
  const { isPlaying, player } = usePlayer();

  const playPauseType = isPlaying ? 'pause' : 'play';
  const disabled = !file;

  const onFirst = useCallback(() => {
    Transport.seconds = Time(Transport.loopStart).toSeconds();
    updateMarker(Transport.progress * 100);
  }, []);

  const onBackward = useCallback(() => {
    Transport.seconds =
      Transport.seconds - 1 < Transport.loopStart
        ? Time(Transport.loopStart).toSeconds()
        : Transport.seconds - 1;
    updateMarker(Transport.progress * 100);
  }, []);

  const onPlayPause = useCallback(() => {
    updateIsPlaying(!isPlaying);
  }, [isPlaying]);

  const onStop = useCallback(() => {
    Transport.seconds = Time(Transport.loopStart).toSeconds();
    updateMarker(Transport.progress * 100);
    updateIsPlaying(false);
  }, []);

  const onForeward = useCallback(() => {
    Transport.seconds = Transport.seconds + 1;
    updateMarker(Transport.progress * 100);
  }, []);

  const onLast = useCallback(() => {
    Transport.seconds = Time(Transport.loopEnd).toSeconds() - 0.1;
    updateMarker(Transport.progress * 100);
  }, []);

  const onExport = useCallback(() => console.log('export'), []);

  useEffect(() => {
    if (file && player) {
      updateIsPlaying(false);
      player.buffer = file.buffer;
      player.state === 'stopped' && player.start();
    }
  }, [file, player]);

  useEffect(() => {
    const { start, end, offset } = selection;
    const loopStart = start < 0 ? offset : start + offset;
    const loopEnd = end + offset;

    Transport.loop = true;
    Transport.setLoopPoints(loopStart, loopEnd);

    if (Transport.seconds < loopStart) {
      Transport.seconds = loopStart;
      updateMarker(Transport.progress * 100);
    }
  }, [selection]);

  useEffect(() => {
    if (isPlaying) Transport.start();
    else Transport.pause();
  }, [isPlaying]);

  useEffect(() => {
    // set repeat to keep track on progess in percent
    Transport.on('start', () => {
      Transport.scheduleRepeat(() => {
        updateMarker(Transport.progress * 100);
      }, '2n');
    });

    Transport.on('pause', () => {
      // cancel all scheduled repeats
      Transport.cancel();
    });

    Transport.on('loopStart', () => {
      console.log('LoopStart', Transport.progress * 100);
      updateMarker(Transport.progress * 100);
    });

    Transport.on('loopEnd', () => {
      console.log('LoopEnd', Transport.progress * 100);
      updateMarker(Transport.progress * 100);
    });
  }, []);

  return (
    <SSlicerControls>
      <Control type="first" onClick={onFirst} disabled={disabled} />
      <Control type="backward" onClick={onBackward} disabled={disabled} />
      <Control type={playPauseType} disabled={disabled} onClick={onPlayPause} />
      <Control type="stop" disabled={disabled} onClick={onStop} />
      <Control type="foreward" onClick={onForeward} disabled={disabled} />
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
