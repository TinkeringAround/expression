import { useCallback, useEffect, useState } from 'react';

export const MAX_ZOOM_LEVEL = 15;

export function useZoom(ref: any) {
  const [zoom, setZoom] = useState<number>(1);

  const handleWheel = useCallback(
    ({ deltaY }: WheelEvent) => {
      const newZoom = zoom + deltaY / 100;

      if (newZoom >= 1 && newZoom <= MAX_ZOOM_LEVEL) setZoom(newZoom);
    },
    [zoom, setZoom]
  );

  useEffect(() => {
    if (ref) {
      ref.addEventListener('wheel', handleWheel);

      return () => {
        ref.removeEventListener('wheel', handleWheel);
      };
    }
  }, [ref, zoom, handleWheel]);

  return { zoom, setZoom };
}
