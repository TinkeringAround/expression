import { useCallback, useEffect, useState } from 'react';

const UNDEFINED = -1;
const INIT = {
  width: UNDEFINED,
  height: UNDEFINED,
  x: UNDEFINED,
  y: UNDEFINED,
  bottom: UNDEFINED,
  top: UNDEFINED,
  left: UNDEFINED,
  right: UNDEFINED,
  toJSON: () => {}
};

export function useClientRect(ref: any, ignoreScroll: boolean = false) {
  const [observer, setObserver] = useState<ResizeObserver>();
  const [rect, setRect] = useState<DOMRectReadOnly>(INIT);

  const onResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      const resizeEvent = [...entries].pop();
      if (resizeEvent) {
        const { width, height } = resizeEvent.contentRect;
        const borderBoxSize = [...resizeEvent.borderBoxSize].pop();

        borderBoxSize &&
          setRect({
            ...resizeEvent.contentRect,
            width: ignoreScroll ? borderBoxSize?.inlineSize : width,
            height: ignoreScroll ? borderBoxSize.blockSize : height
          });
      }
    },
    [setRect, ignoreScroll]
  );

  useEffect(() => {
    setObserver(new ResizeObserver(onResize));

    return () => observer?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    observer && observer.observe(ref);
  }, [observer, ref]);

  return { rect };
}
