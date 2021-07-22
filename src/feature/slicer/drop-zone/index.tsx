import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { AudioFile, DropFile } from '../../../store/slicer/types';
import { getAudioType, isAudio, isSupported } from '../../../lib/audio';
import { addSlicerFiles, loadSlicerFile } from '../../../store/slicer/actions';
import { useSlicer } from '../../../store/slicer';

import Icon from '../../../component/icon';
import For from '../../../component/for';
import If from '../../../component/if';

import DropZoneFile from './drop-zone-file';
import { SDropZoneFiles, SAudioInput, SDropZone, SResizableOverlay } from './styled';

const ERROR_MESSAGE = {
  message: 'Not supported file type',
  code: 'file-invalid-type'
};

const DropZone: FC = () => {
  const { files, file } = useSlicer();

  const isSelected = useCallback(
    (fileName: string) => {
      return fileName === file?.name;
    },
    [file]
  );

  const loadFile = useCallback(
    file => {
      return !isSelected(file) && !file.audio && loadSlicerFile(file);
    },
    [isSelected]
  );

  const onDrop = useCallback((files: DropFile[]) => {
    addSlicerFiles(files.map(({ name, type, size, path = '' }) => ({ name, type, size, path })));
  }, []);

  const isInvalid = useCallback(({ type }) => {
    return !isAudio(type) || !isSupported(getAudioType(type)) ? ERROR_MESSAGE : null;
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    validator: isInvalid
  });

  return (
    <SDropZone role="dropzone" {...getRootProps()}>
      {/* White Overlay when dragged */}
      <If condition={isDragActive}>
        <SResizableOverlay role="overlay" />
      </If>

      <SDropZoneFiles>
        <For
          values={files}
          projector={(file: AudioFile) => (
            <DropZoneFile
              key={file.name}
              file={file}
              isSelected={isSelected(file.name)}
              onClick={loadFile}
            />
          )}
        />
      </SDropZoneFiles>

      <SAudioInput onClick={open}>
        <input {...getInputProps()} />
        <Icon iconType="upload" />
        Upload Audio Files
      </SAudioInput>
    </SDropZone>
  );
};

export default DropZone;
