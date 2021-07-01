import React, { FC, useCallback } from 'react';

import { anyFunction } from '../../lib/util';
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

  const mapKey = useCallback((key: AvailableKeys) => {
    switch (key) {
      case 'ArrowLeft':
        return '🠔';
      case 'ArrowRight':
        return '🠖';
      default:
        return key;
    }
  }, []);

  return (
    <SShortcut className={show && !disabled ? 'show' : ''}>
      {withCtrl && <kbd>Strg</kbd>}
      {withCtrl && <span>+</span>}
      <kbd>{mapKey(key)}</kbd>
    </SShortcut>
  );
};

export default Shortcut;
