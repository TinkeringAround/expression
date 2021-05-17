import React, { FC, useCallback, useRef } from 'react';
import { Resizable } from 're-resizable';
import { useDropzone } from 'react-dropzone';

import { addSlicerScripts, loadSlicerFile } from '../../../store/actions';
import { useStore } from '../../../store';
import { AudioFile } from '../../../store/types';
import { isAudio } from '../../../audio';

import Icon from '../../../component/icon';
import AudioFilePartial from './audioFilePartial';
import { SAudioFiles, SAudioInput, SAudioDropZone, SResizableOverlay } from './styled';

const MIN_WIDTH = 250;
const MAX_WIDTH = 400;
const DEFAULT_SIZE = {
  width: 300,
  height: '100%'
};
const ERROR_MESSAGE = {
  message: 'Not supported file type',
  code: 'file-invalid-type'
};

const AudioDropZone: FC = () => {
  const audioFiles = useRef<HTMLDivElement>(null);
  const { files, selectedFile } = useStore().slicer;

  const isSelected = useCallback((fileName: string) => fileName === selectedFile?.name, [
    selectedFile
  ]);

  const loadFile = useCallback(file => !isSelected(file) && !file.audio && loadSlicerFile(file), [
    isSelected
  ]);

  const onDrop = useCallback(files => {
    addSlicerScripts(
      files.map((file: any) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        path: file.path
      }))
    );
  }, []);

  const FileValidator = useCallback(file => (!isAudio(file.type) ? ERROR_MESSAGE : null), []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    validator: FileValidator
  });

  return (
    <SAudioDropZone role="dropzone" {...getRootProps()}>
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
        <SAudioFiles ref={audioFiles}>
          {files.map((file: AudioFile) => (
            <AudioFilePartial
              key={file.name}
              file={file}
              isSelected={isSelected(file.name)}
              onClick={loadFile}
            />
          ))}
        </SAudioFiles>

        {/* Audio Input Footer */}
        <SAudioInput onClick={open}>
          <input {...getInputProps()} />
          <Icon iconType="file-add" />
          Import Audio File
        </SAudioInput>
      </Resizable>
    </SAudioDropZone>
  );
};

export default AudioDropZone;
