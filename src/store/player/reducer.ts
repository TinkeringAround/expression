import { ACTION } from '../action-types';
import { usePlayer } from './index';
import { UpdateMarkerPayload, UpdatePlayerPayload } from './types';

const { on } = window.electron;

// ==============================================================
export const updateIsPlayingRecipe = (_: any, { isPlaying }: UpdatePlayerPayload) => {
  const { isPlaying: playing, update } = usePlayer.getState();

  playing !== isPlaying && update({ isPlaying });
};

export const updateMarkerRecipe = (_: any, { marker }: UpdateMarkerPayload) => {
  const { marker: currentMarker, update } = usePlayer.getState();

  currentMarker !== marker && update({ marker });
};

// ==============================================================
on(ACTION.updateIsPlaying, updateIsPlayingRecipe);
on(ACTION.updateMarker, updateMarkerRecipe);
