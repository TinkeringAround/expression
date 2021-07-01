import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { anyFunction } from '../../lib/util';
import { AvailableKeys } from '../../hook/useKeyboard';

import Control from './index';

import { AppMock } from '../../mock/components';

describe('Control', () => {
  const ControlInApp = (
    onClick: anyFunction,
    keyboard?: AvailableKeys,
    withCtrl?: boolean,
    disabled?: boolean
  ) => (
    <AppMock>
      <Control
        type="play"
        keyboard={keyboard}
        withCtrl={withCtrl}
        disabled={disabled}
        onClick={onClick}
      />
    </AppMock>
  );

  test('should render basic control without shortcut', () => {
    render(ControlInApp(() => {}));

    expect(document.querySelector('.icon-play')).toBeInTheDocument();
    expect(document.querySelectorAll('kbd').length).toBe(0);
  });

  test('should render basic control with shortcut', () => {
    render(ControlInApp(() => {}, 'S'));

    expect(document.querySelector('.icon-play')).toBeInTheDocument();
    expect(document.querySelectorAll('kbd').length).toBeGreaterThan(0);
  });

  test('should call onClick when not disabled', () => {
    const onClick = jest.fn();
    render(ControlInApp(onClick, 'S', false, false));

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });

  test('should not call onClick when disabled', () => {
    const onClick = jest.fn();
    render(ControlInApp(onClick, 'S', false, true));

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
