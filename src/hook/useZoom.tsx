import { useCallback, useEffect, useState } from 'react';

const MAX_ZOOM_LEVEL = 15;

export function useZoom() {
  const [zoom, setZoom] = useState<number>(1);

  const handleWheel = useCallback(
    ({ deltaY }: WheelEvent) => {
      const newZoom = zoom + deltaY / 100;

      if (newZoom >= 1 && newZoom <= MAX_ZOOM_LEVEL) setZoom(newZoom);
    },
    [zoom, setZoom]
  );

  useEffect(() => {
    document.addEventListener('wheel', handleWheel);

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [zoom, handleWheel]);

  return zoom;
}
