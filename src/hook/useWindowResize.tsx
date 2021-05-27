import { useCallback, useEffect, useState } from 'react';

type Size = {
  width: number;
  height: number;
};

const UNDEFINED = -1;

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<Size>({
    width: UNDEFINED,
    height: UNDEFINED
  });

  const onWindowResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [setWindowSize]);

  useEffect(() => {
    // Call handler right away so state gets updated with initial window size
    onWindowResize();
    window.addEventListener('resize', onWindowResize);

    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  return { windowSize };
}
