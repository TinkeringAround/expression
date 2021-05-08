export type File = {
  name: string;
  path: string;
  size: number;
  type: string;
};

export type AddSlicerFilesPayload = {
  files: File[];
};

export type SelectSlicerFilePayload = {
  file: File | null;
};
