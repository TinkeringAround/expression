import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AvailableKeys } from '../../hook/useKeyboard';
import { anyFunction } from '../../util';

import Shortcut from './index';

import { AppMock } from '../../mock/components';

describe('Shortcut', () => {
  const ShortcutInApp = (
    keyboard: AvailableKeys,
    withCtrl: boolean,
    disabled: boolean,
    onClick: anyFunction
  ) => (
    <AppMock>
      <Shortcut keyboard={keyboard} withCtrl={withCtrl} disabled={disabled} onClick={onClick} />
    </AppMock>
  );

  test('should display shortcut overlay when ctrl is pressed and disabled is false', () => {
    render(ShortcutInApp('S', true, false, () => {}));

    fireEvent.keyDown(document, { key: 'Control' });

    expect(document.querySelector('.show')).toBeInTheDocument();
  });

  test('should not display shortcut overlay when ctrl is pressed and disabled is true', () => {
    render(ShortcutInApp('S', true, true, () => {}));

    fireEvent.keyDown(document, { key: 'Control' });

    expect(document.querySelector('.show')).not.toBeInTheDocument();
  });
});
