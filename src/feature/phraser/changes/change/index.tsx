import React, { FC } from 'react';

import { SongChange } from '../../../../store/phraser/types';

import If from '../../../../component/if';
import Icon from '../../../../component/icon';

import { SChange } from './styled';

interface Props {
  change: SongChange;
}

const Change: FC<Props> = ({ change }) => {
  const isUpdate = change.action === 'update';
  const isAddition = change.action === 'add';
  const isRemoval = change.action === 'remove';
  const isReorder = change.action === 'reorder';
  const isMove = change.action === 'move';

  let classNames = 'yellow';
  if (isUpdate) {
    classNames = 'blue';
  }

  if (isAddition) {
    classNames = 'green';
  }

  if (isRemoval) {
    classNames = 'red';
  }

  return (
    <SChange className={classNames}>
      <If condition={isUpdate}>
        <Icon iconType="edit" />
      </If>
      <If condition={isAddition}>
        <Icon iconType="plus" />
      </If>
      <If condition={isRemoval}>
        <Icon iconType="minus" />
      </If>
      <If condition={isReorder}>
        <Icon iconType="reorder" />
      </If>
      <If condition={isMove}>
        <Icon iconType="reorder" />
      </If>
      <span>
        {change.action} <b>{change.kind.toUpperCase()}</b>
      </span>
    </SChange>
  );
};

export default Change;
