import { ACTION } from '../action-types';

const { trigger } = window.electron;

export const updateIsPlaying = (isPlaying: boolean) =>
  trigger(ACTION.updateIsPlaying, { isPlaying });
export const updateMarker = (marker: number) => trigger(ACTION.updateMarker, { marker }); // TODO: Refactor
