import React, { FC } from 'react';

import { anyFunction } from '../../util';
import { AvailableKeys, useKeyboard } from '../../hook/useKeyboard';

import { SShortcut } from './styled';

interface Props {
  keyboard: AvailableKeys;
  withCtrl: boolean;
  disabled: boolean;
  onClick: anyFunction;
}

const Shortcut: FC<Props> = ({ keyboard: key, withCtrl, disabled, onClick }) => {
  const { ctrlPressed: show } = useKeyboard(key, withCtrl, onClick, disabled);

  return (
    <SShortcut className={show && !disabled ? 'show' : ''}>
      <kbd>Strg</kbd>
      <span>+</span>
      <kbd>{key}</kbd>
    </SShortcut>
  );
};

export default Shortcut;
