import React, { FC, useCallback } from 'react';
import { Resizable } from 're-resizable';
import { useDropzone } from 'react-dropzone';

import { SDropzone } from './styled';
import { addSlicerScripts } from '../../store/actions';
import { useStore } from '../../store';

const FileDropZone: FC = () => {
  const MIN_WIDTH = 250,
    MAX_WIDTH = 350;
  const { files } = useStore().slicer;

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

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    validator: fileIsValid
  });

  return (
    <SDropzone className={isDragActive ? 'isDragging' : ''}>
      <Resizable
        {...getRootProps()}
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
        <div className="audioFiles">
          {files.map(file => (
            <div key={file.name}>{file.name}</div>
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
