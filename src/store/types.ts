export type AudioFile = {
  name: string;
  path: string;
  size: number;
  type: string;
};

export type AddSlicerFilesPayload = {
  files: AudioFile[];
};

export type SelectSlicerFilePayload = {
  file: AudioFile | null;
};
