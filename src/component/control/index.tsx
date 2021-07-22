import React, { FC } from 'react';

import { anyFunction } from '../../lib/util';
import { AvailableKeys } from '../../hook/useKeyboard';

import Icon, { IconType } from '../icon';
import Shortcut from '../shortcut';

import { SControl } from './styled';

interface Props {
  type: IconType;
  onClick: anyFunction;

  title?: string;
  disabled?: boolean;
  keyboard?: AvailableKeys;
  withCtrl?: boolean;
}

const Control: FC<Props> = ({
  type,
  title,
  disabled = false,
  keyboard: key,
  withCtrl = false,
  onClick
}) => (
  <SControl onClick={onClick} disabled={disabled}>
    <Icon title={title} iconType={type} />
    {key && <Shortcut keyboard={key} withCtrl={withCtrl} disabled={disabled} onClick={onClick} />}
  </SControl>
);

export default Control;
