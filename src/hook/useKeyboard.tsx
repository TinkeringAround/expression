import { useCallback, useEffect, useState } from 'react';

import { anyFunction } from '../util';

export type AvailableKeys = 'Space' | 'Enter' | 'S' | 'E';

export function useKeyboard(
  shortcutKey: AvailableKeys,
  withCtrl: boolean,
  onClick: anyFunction,
  disabled: boolean
) {
  const [ctrlPressed, setCtrlPressed] = useState<boolean>(false);

  const mapShortcutKey = useCallback((key: string) => {
    switch (key) {
      case 'Space':
        return ' ';
      default:
        return key.toLowerCase();
    }
  }, []);

  const handleKeyDown = useCallback(
    ({ key, ctrlKey }: any) => {
      if (disabled) return;

      if (key === 'Control') {
        !ctrlPressed && setCtrlPressed(true);
        return;
      }

      // currently pressed key with optional control prefix
      const withControl = ctrlKey ? 'control' : '';
      const pressedKey = `${withControl}${key}`;

      // shortcut key with optional control prefix
      const triggerWithCtrl = withCtrl ? 'control' : '';
      const shortcut = `${triggerWithCtrl}${mapShortcutKey(shortcutKey)}`;

      if (pressedKey === shortcut) {
        onClick();
      }
    },
    [ctrlPressed, setCtrlPressed, shortcutKey, withCtrl, disabled, onClick, mapShortcutKey]
  );

  const handleKeyUp = useCallback(() => {
    setCtrlPressed(false);
  }, [setCtrlPressed]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return { ctrlPressed };
}
