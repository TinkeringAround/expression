import { useCallback, useEffect, useState } from 'react';

import { anyFunction } from '../lib/util';

export type AvailableKeys = 'Space' | 'Enter' | 'S' | 'E' | 'F' | 'ArrowLeft' | 'ArrowRight';

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
    ({ key }: any) => {
      if (disabled) return;

      key === 'Control' && !ctrlPressed && setCtrlPressed(true);
    },
    [ctrlPressed, setCtrlPressed, disabled]
  );

  const handleKeyUp = useCallback(
    ({ key, ctrlKey }: any) => {
      if (disabled) return;

      setCtrlPressed(false);

      // currently pressed key with optional control prefix
      const withControl = ctrlKey ? 'control' : '';
      const pressedKey = `${withControl}${key.toLowerCase()}`;

      // shortcut key with optional control prefix
      const triggerWithCtrl = withCtrl ? 'control' : '';
      const shortcut = `${triggerWithCtrl}${mapShortcutKey(shortcutKey)}`;

      if (pressedKey === shortcut) {
        onClick();
      }
    },
    [disabled, setCtrlPressed, shortcutKey, withCtrl, onClick, mapShortcutKey]
  );

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
