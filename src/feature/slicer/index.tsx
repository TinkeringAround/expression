import React, { FC } from 'react';
import FileDropZone from '../../component/file-drop-zone';

import { SSlicer } from './styled';
import { useStore } from '../../store';

const Slicer: FC = () => {
  const file = useStore(state => state.slicer.selectedFile);

  const Visualizer = <div className="visualizer" />;

  return (
    <SSlicer>
      <FileDropZone />
      <div className="content">{file && file.audio && Visualizer}</div>
    </SSlicer>
  );
};

export default Slicer;
