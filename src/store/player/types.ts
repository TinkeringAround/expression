import { Seconds } from 'tone/build/esm/core/type/Units';

export type UpdatePlayerPayload = {
  isPlaying: boolean;
};

export type UpdateMarkerPayload = {
  marker: Seconds;
};
