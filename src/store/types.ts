import { ToneAudioBuffer } from 'tone';

export type AudioFile = {
  name: string;
  path: string;
  size: number;
  type: string;
  audio?: Audio;
};

export type Audio = {
  buffer: ToneAudioBuffer;
  channelData: Float32Array[];
};

export type HasError = {
  error?: string;
};

export type AddSlicerFilesPayload = {
  files: AudioFile[];
};

export type SlicerAudioFileLoadedPayload = {
  file: AudioFile;
  channelData?: Float32Array[];
} & HasError;
