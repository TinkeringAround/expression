import React, { useCallback, useEffect, useRef, useState } from 'react';

import { anyFunction } from '../util';

export interface DragState {
  x: number;
  dragging: boolean;
  draggable: React.RefObject<HTMLDivElement>;
  onDragPrevent: anyFunction;
  onDragStart: anyFunction;
  onDrag: anyFunction;
  onDragEnd: anyFunction;
}

export function useDrag(minX: number, maxX: number, startX: number): DragState {
  const draggable = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<{
    dragging: boolean;
    rel: number;
    x: number;
  }>({
    dragging: false,
    rel: 0,
    x: startX
  });

  // update relative position to the mouse
  const onDragStart = useCallback(
    ({ button, pageX }: React.MouseEvent<HTMLDivElement, DragEvent>) => {
      // only if drag via left mouse button
      if (button !== 0) return;

      if (draggable.current) {
        setState({
          ...state,
          rel: pageX - draggable.current.offsetLeft,
          dragging: true
        });
      }
    },
    [state, setState]
  );

  const onDrag = useCallback(
    ({ clientX }: React.MouseEvent<HTMLDivElement, DragEvent>) => {
      const { dragging, rel } = state;

      if (dragging) {
        let x = clientX - rel;
        // prevent position will be beyond right border
        if (x > maxX) x = maxX;
        // prevent position will be beyond left border
        else if (x < minX) x = minX;

        setState({
          ...state,
          x
        });
      }
    },
    [state, maxX, minX, setState]
  );

  const onDragEnd = useCallback(
    (event: React.MouseEvent<HTMLDivElement, DragEvent>) => {
      event.preventDefault();

      if (state.dragging) {
        setState({
          ...state,
          dragging: false,
          rel: 0
        });
      }
    },
    [state]
  );

  const onDragPrevent = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  useEffect(() => {
    const { x } = state;
    if (x < minX) setState({ ...state, x: minX });
  }, [state, minX, setState]);

  useEffect(() => {
    const { x } = state;
    if (x > maxX) setState({ ...state, x: maxX });
  }, [state, maxX, setState]);

  return {
    x: state.x,
    dragging: state.dragging,
    draggable,
    onDragPrevent,
    onDragStart,
    onDrag,
    onDragEnd
  };
}
