import { mock } from 'jest-mock-extended';

import * as ReactDropZone from 'react-dropzone';

export const mockReactDropZone = () =>
  jest.spyOn(ReactDropZone, 'useDropzone').mockReturnValueOnce(
    mock<ReactDropZone.DropzoneState>({
      getRootProps: jest.fn(),
      getInputProps: jest.fn(),
      open: jest.fn(),
      isDragActive: true
    })
  );
