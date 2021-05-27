import { useCallback, useEffect, useState } from 'react';

import { useWindowSize } from './useWindowResize';

export type Rect = { width: number; height: number; x: number; y: number };

const UNDEFINED = -1;
const initialRect = {
  width: UNDEFINED,
  height: UNDEFINED,
  x: UNDEFINED,
  y: UNDEFINED
};

export function useClientRect() {
  const { windowSize } = useWindowSize();

  const [node, setNode] = useState<any>(null);
  const [rect, setRect] = useState<Rect>(initialRect);

  const updateRect = useCallback(
    (node: any) => {
      const { width, height, x, y } = node.getBoundingClientRect();
      setRect({ width, height, x, y });
    },
    [setRect]
  );

  const ref = useCallback(node => {
    if (node) {
      updateRect(node);
      setNode(node);
    }
  }, []);

  useEffect(() => {
    node && updateRect(node);
  }, [node, windowSize, setRect]);

  return { rect, ref };
}
