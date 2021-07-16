import { useCallback } from 'react';

export function useClipboard() {
  const copy = useCallback(
    (text: string): Promise<boolean> =>
      new Promise<boolean>(resolve => {
        if (!window.navigator.clipboard) {
          resolve(false);
        }

        window.navigator.clipboard
          .writeText(text)
          .then(() => resolve(true))
          .catch(() => resolve(false));
      }),
    []
  );

  return { copy };
}
