import React, { FC } from 'react';

import { useSlicer } from '../../../store/slicer';

import Icon from '../../../component/icon';

import { SHint } from './styled';

const Hint: FC = () => {
  const { files, file } = useSlicer();

  return (
    <SHint>
      {(files.length === 0 || !file) && <Icon iconType="upload" />}
      {files.length === 0 && <span>Upload Files to Edit</span>}
      {files.length > 0 && !file && <span>Select a File to Edit</span>}
    </SHint>
  );
};
export default Hint;
