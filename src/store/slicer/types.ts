import { ToneAudioBuffer } from 'tone';
import { Seconds } from 'tone/build/esm/core/type/Units';

export type SlicerAudioFile = AudioFile & SlicerAudioFileExtension;

type SlicerAudioFileExtension = {
  buffer: ToneAudioBuffer;
  channelData: Float32Array[];
};

export type SlicerSelection = {
  start: Seconds;
  end: Seconds;
  zoom: Seconds;
  offset: number;
};

export interface DropFile extends File {
  path?: string;
}

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

export interface HasProgress {
  readonly progress: number;
}
