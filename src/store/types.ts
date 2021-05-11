export type AudioFile = {
  name: string;
  path: string;
  size: number;
  type: string;
  audio?: {
    channelData: Float32Array;
    sampleRate: number;
  };
};

export type HasError = {
  error?: string;
};

export type AddSlicerFilesPayload = {
  files: AudioFile[];
};

export type SlicerAudioFileLoadedPayload = {
  file: AudioFile | null;
} & HasError;
