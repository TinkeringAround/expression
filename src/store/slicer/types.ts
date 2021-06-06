import { ToneAudioBuffer } from 'tone';

export type SlicerAudioFile = AudioFile & SlicerAudioFileExtension;

type SlicerAudioFileExtension = {
  buffer: ToneAudioBuffer;
  channelData: Float32Array[];
};

export type SlicerSelection = {
  start: number;
  end: number;
  zoom: number;
  offset: number;
};

export type AudioFile = {
  name: string;
  path: string;
  size: number;
  type: string;
};

export type HasError = {
  error?: string;
};

export type AddSlicerFilesPayload = {
  files: AudioFile[];
};

export type RemoveSlicerFilePayload = {
  file: AudioFile;
};

export type SlicerAudioFileLoadedPayload = {
  file: AudioFile;
  channelData: Float32Array[];
} & HasError;

export type UpdateSlicerSelectionPayload = Partial<SlicerSelection>;
