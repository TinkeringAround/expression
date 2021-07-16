import React, { FC, useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  const value = 'start',
    nextValue = 'end';
  const delay = 500;

  const UseDebounce: FC<{ value: string; nextValue: string }> = ({ value, nextValue }) => {
    const [currentVal, setCurrentVal] = useState<string>(value);
    const debouncedValue = useDebounce(currentVal, delay);

    return (
      <div role="wrapper" onClick={() => setCurrentVal(nextValue)}>
        {debouncedValue}
      </div>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should show initial value', () => {
    render(<UseDebounce value={value} nextValue={nextValue} />);

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  test('should update value when debounce time passes', () => {
    render(<UseDebounce value={value} nextValue={nextValue} />);

    act(() => {
      fireEvent.click(screen.getByRole('wrapper'));
      jest.advanceTimersByTime(delay);
    });

    expect(screen.getByText(nextValue)).toBeInTheDocument();
  });
});
