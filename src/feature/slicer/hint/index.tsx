import React, { FC } from 'react';

import { useSlicer } from '../../../store/slicer';

import Icon from '../../../component/icon';
import If from '../../../component/if';

import { SHint } from './styled';

const Hint: FC = () => {
  const { files, file } = useSlicer();

  return (
    <SHint>
      <If condition={files.length === 0 || !file}>
        <Icon iconType="upload" />
      </If>
      <If condition={files.length === 0}>
        <span>Upload Files to Edit</span>
      </If>
      <If condition={files.length > 0 && !file}>
        <span>Select a File to Edit</span>
      </If>
    </SHint>
  );
};
export default Hint;
