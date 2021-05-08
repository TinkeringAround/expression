import React, { FC } from 'react';
import FileDropZone from '../../component/file-drop-zone';

import { SSlicer } from './styled';

const Slicer: FC = () => {
  return (
    <SSlicer>
      <FileDropZone />
      <div className="content">Content</div>
    </SSlicer>
  );
};

export default Slicer;
