import React, { FC, useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useClipboard } from './useClipboard';

import { mockClipBoard } from '../mock/window';

describe('useClipboard', () => {
  const UseClipboard: FC = () => {
    const { copy } = useClipboard();

    const [success, setSuccess] = useState<boolean>(false);

    return (
      <div
        role="wrapper"
        onClick={async () => {
          const success = await copy('text');
          setSuccess(success);
        }}
      >
        {`${success}`}
      </div>
    );
  };

  test('should successfully copy to clipboard', async () => {
    mockClipBoard(true);

    render(<UseClipboard />);

    expect(screen.queryByText('true')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('wrapper'));

    await waitFor(() => expect(screen.getByText('true')).toBeInTheDocument());
  });

  test('should return false when copy to clipboard is rejected', async () => {
    const { writeText } = mockClipBoard(false);

    render(<UseClipboard />);

    fireEvent.click(screen.getByRole('wrapper'));

    await waitFor(() => {
      expect(screen.queryByText('true')).not.toBeInTheDocument();
      return expect(writeText).toHaveBeenCalled();
    });
  });

  describe('with no navigator.clipboard', () => {
    beforeEach(() => {
      mockClipBoard();
    });

    test('should reject when navigator.clipboard is undefined', async () => {
      render(<UseClipboard />);
      Object.assign(window.navigator, {
        clipboard: undefined
      });

      fireEvent.click(screen.getByRole('wrapper'));

      await waitFor(() => {
        return expect(screen.queryByText('true')).not.toBeInTheDocument();
      });
    });
  });
});
