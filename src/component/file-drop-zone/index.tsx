import React, { FC, useCallback } from 'react';
import { Resizable } from 're-resizable';
import { useDropzone } from 'react-dropzone';

import { SDropzone } from './styled';
import { addSlicerScripts, selectSlicerFile } from '../../store/actions';
import { useStore } from '../../store';
import { bytesToMegaBytes } from '../../util';
import { File } from '../../store/types';

const MIN_WIDTH = 0,
  MAX_WIDTH = 350;

const FileDropZone: FC = () => {
  const { files, selectedFile } = useStore().slicer;

  const isSelected = useCallback((file: File) => file.name === selectedFile?.name, [selectedFile]);

  const selectFile = useCallback(file => selectSlicerFile(isSelected(file) ? null : file), [
    isSelected
  ]);

  const onDrop = useCallback((files: File[]) => {
    addSlicerScripts(
      files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        path: file.path
      }))
    );
  }, []);

  const fileIsValid = useCallback(
    file =>
      file.type.includes('audio')
        ? null
        : {
            message: 'Not supported file type',
            code: 'file-invalid-type'
          },
    []
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    onDrop,
    noClick: true,
    validator: fileIsValid
  });

  return (
    <SDropzone {...getRootProps()}>
      <Resizable
        className="resizable"
        defaultSize={{
          width: 300,
          height: '100%'
        }}
        minWidth={MIN_WIDTH}
        maxWidth={MAX_WIDTH}
        minHeight="100%"
        maxHeight="100%"
        enable={{ right: true }}
      >
        {isDragActive && !isDragReject && <div className="overlay" />}
        <div className="audioFiles">
          {files.map((file: File) => (
            <div
              key={file.name}
              className={`file ${isSelected(file) ? 'selected' : ''}`}
              onClick={() => selectFile(file)}
            >
              <span className="name">{file.name}</span>
              <span className="size">{bytesToMegaBytes(file.size)}</span>
            </div>
          ))}
        </div>
        <footer className="audioInput" onClick={open}>
          <input {...getInputProps()} />
          Import Audio File
        </footer>
      </Resizable>
    </SDropzone>
  );
};

export default FileDropZone;
