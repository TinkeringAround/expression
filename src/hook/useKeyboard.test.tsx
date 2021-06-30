import React, { FC } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AvailableKeys, useKeyboard } from './useKeyboard';
import { anyFunction } from '../lib/util';

describe('useKeyboard', () => {
  type Props = {
    shortcutKey: AvailableKeys;
    withCtrl: boolean;
    onClick: anyFunction;
    disabled: boolean;
  };

  const UseKeyboard: FC<Props> = ({ shortcutKey, withCtrl, onClick, disabled }) => {
    const { ctrlPressed } = useKeyboard(shortcutKey, withCtrl, onClick, disabled);

    return <div role="wrapper">{`${ctrlPressed}`}</div>;
  };

  test('should update ctrlPressed when ctrl is pressed', () => {
    render(<UseKeyboard shortcutKey="E" withCtrl onClick={() => {}} disabled={false} />);

    fireEvent.keyDown(document, { key: 'Control' });
    expect(screen.getByText(/true/)).toBeInTheDocument();

    fireEvent.keyUp(document, { key: 'Control' });
    expect(screen.getByText(/false/)).toBeInTheDocument();
  });

  test('should call onClick when shortcut is pressed', () => {
    const onClick = jest.fn();
    render(<UseKeyboard shortcutKey="E" withCtrl onClick={onClick} disabled={false} />);

    fireEvent.keyUp(document, { key: 'e', ctrlKey: true });

    expect(onClick).toHaveBeenCalled();
  });

  test('should not call onClick when non shortcut is pressed', () => {
    const onClick = jest.fn();
    render(<UseKeyboard shortcutKey="E" withCtrl onClick={onClick} disabled={false} />);

    fireEvent.keyDown(document, { key: 's', ctrlKey: true });

    expect(onClick).not.toHaveBeenCalled();
  });

  test('should not call onClick when shortcut is not pressed ', () => {
    const onClick = jest.fn();
    render(<UseKeyboard shortcutKey="E" withCtrl={false} onClick={onClick} disabled={false} />);

    fireEvent.keyDown(document, { key: 'e', ctrlKey: true });

    expect(onClick).not.toHaveBeenCalled();
  });

  test('should not call onClick when shortcut is called without ctrl', () => {
    const onClick = jest.fn();
    render(<UseKeyboard shortcutKey="E" withCtrl onClick={onClick} disabled={false} />);

    fireEvent.keyDown(document, { key: 'e', ctrlKey: false });

    expect(onClick).not.toHaveBeenCalled();
  });

  test('should map available shortcut keys without Control to keys and call onClick', () => {
    const onClick = jest.fn();
    render(<UseKeyboard shortcutKey="Space" withCtrl={false} onClick={onClick} disabled={false} />);

    fireEvent.keyUp(document, { key: ' ', ctrlKey: false });

    expect(onClick).toHaveBeenCalled();
  });

  test('should map available shortcut keys with Control to keys and call onClick', () => {
    const onClick = jest.fn();
    render(<UseKeyboard shortcutKey="Space" withCtrl onClick={onClick} disabled={false} />);

    fireEvent.keyUp(document, { key: ' ', ctrlKey: true });

    expect(onClick).toHaveBeenCalled();
  });

  test('should ignore key events when disabled is true', () => {
    const onClick = jest.fn();
    render(<UseKeyboard shortcutKey="Space" withCtrl onClick={onClick} disabled />);

    fireEvent.keyDown(document, { key: ' ', ctrlKey: true });

    expect(onClick).not.toHaveBeenCalled();
  });

  test('should ignore click execution when disabled is true', () => {
    const onClick = jest.fn();
    render(<UseKeyboard shortcutKey="Space" withCtrl onClick={onClick} disabled />);

    fireEvent.keyUp(document, { key: ' ', ctrlKey: true });

    expect(onClick).not.toHaveBeenCalled();
  });
});
