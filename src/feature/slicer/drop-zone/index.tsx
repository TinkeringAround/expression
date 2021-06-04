import React, { FC, useCallback } from 'react';
import { Resizable } from 're-resizable';
import { useDropzone } from 'react-dropzone';

import { AudioFile } from '../../../store/slicer/types';
import { isAudio } from '../../../audio';

import Icon from '../../../component/icon';
import DropZoneFile from './drop-zone-file';
import { SDropZoneFiles, SAudioInput, SDropZone, SResizableOverlay } from './styled';
import { addSlicerFiles, loadSlicerFile } from '../../../store/slicer/actions';
import { useSlicer } from '../../../store/slicer';

const MIN_WIDTH = 225;
const MAX_WIDTH = 400;
const DEFAULT_SIZE = {
  width: 300,
  height: '100%'
};
const ERROR_MESSAGE = {
  message: 'Not supported file type',
  code: 'file-invalid-type'
};

const DropZone: FC = () => {
  const { files, file } = useSlicer();

  const isSelected = useCallback((fileName: string) => fileName === file?.name, [file]);

  const loadFile = useCallback(file => !isSelected(file) && !file.audio && loadSlicerFile(file), [
    isSelected
  ]);

  const onDrop = useCallback(files => {
    addSlicerFiles(
      files.map((file: any) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        path: file.path
      }))
    );
  }, []);

  const fileIsValid = useCallback(file => (!isAudio(file.type) ? ERROR_MESSAGE : null), []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    validator: fileIsValid
  });

  return (
    <SDropZone role="dropzone" {...getRootProps()}>
      {/* Resizable Wrapper */}
      <Resizable
        className="resizable"
        defaultSize={DEFAULT_SIZE}
        minWidth={MIN_WIDTH}
        maxWidth={MAX_WIDTH}
        minHeight="100%"
        maxHeight="100%"
        enable={{ right: true }}
      >
        {/* White Overlay when dragged */}
        {isDragActive && <SResizableOverlay role="overlay" />}

        {/* Audio Files */}
        <SDropZoneFiles>
          {files.map((file: AudioFile) => (
            <DropZoneFile
              key={file.name}
              file={file}
              isSelected={isSelected(file.name)}
              onClick={loadFile}
            />
          ))}
        </SDropZoneFiles>

        {/* Audio Input Footer */}
        <SAudioInput onClick={open}>
          <input {...getInputProps()} />
          <Icon iconType="upload" />
          Upload Audio Files
        </SAudioInput>
      </Resizable>
    </SDropZone>
  );
};

export default DropZone;
