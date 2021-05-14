import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { SAudioVisualizerAreaSelection, SSelector, SSelectedArea } from './styled';

const WIDTH = 6;
const UNDEFINED = 100000;

export type Direction = 'left' | 'right';

const AudioVisualizerAreaSelection: FC = () => {
  const draggable = useRef<HTMLDivElement>(null);
  const leftBorder = useRef<HTMLDivElement>(null);
  const rightBorder = useRef<HTMLDivElement>(null);
  const highlightArea = useRef<HTMLDivElement>(null);

  const [maxWidth, setMaxWidth] = useState<number>(UNDEFINED);
  const [dragging, setDragging] = useState<Direction | null>(null);
  const [rel, setRel] = useState<number>(0);

  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(maxWidth);

  // // calculate relative position to the mouse
  const onDragStart = useCallback(
    (direction: Direction, event: React.MouseEvent<HTMLDivElement, DragEvent>) => {
      const { button, pageX } = event;

      // only left mouse button
      if (button !== 0) return;

      if (direction === 'left' && leftBorder.current) {
        const { offsetLeft } = leftBorder.current;
        setRel(pageX - offsetLeft);
      }

      if (direction === 'right' && rightBorder.current) {
        const { offsetLeft } = rightBorder.current;
        setRel(pageX - offsetLeft);
      }

      setDragging(direction);
    },
    [setRel, setDragging]
  );

  const onDrag = useCallback(
    (event: React.MouseEvent<HTMLDivElement, DragEvent>) => {
      if (!dragging) return;

      const { clientX } = event;

      if (dragging === 'left' && leftBorder.current) {
        let x = clientX - rel;

        // prevent left border will be beyond right border
        if (x >= right - WIDTH) x = right - WIDTH;
        // prevent left border will be outside of parent
        else if (x < 0) x = 0;

        setLeft(x);
      }

      if (dragging === 'right' && rightBorder.current) {
        let x = clientX - rel;

        // prevent right border will be beyond left border
        if (x <= left + WIDTH) x = left + WIDTH;
        // prevent right border will be outside of parent
        else if (x > maxWidth - WIDTH) x = maxWidth - WIDTH;

        setRight(x);
      }
    },
    [dragging, right, setLeft, left, setRight, rel, maxWidth]
  );

  const onDragEnd = useCallback(
    (event: React.MouseEvent<HTMLDivElement, DragEvent>) => {
      event.preventDefault();

      if (dragging) {
        setDragging(null);
        setRel(0);
      }
    },
    [dragging, setDragging, setRel]
  );

  const onDragPrevent = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  useEffect(() => {
    if (highlightArea.current) {
      highlightArea.current.style.width = `${right - left - WIDTH}px`;
      highlightArea.current.style.left = `${left + WIDTH}px`;
    }
  }, [left, right]);

  useEffect(() => {
    if (draggable.current && right === UNDEFINED) {
      setRight(draggable.current.clientWidth - WIDTH);
      setMaxWidth(draggable.current.clientWidth);
    }
  }, [draggable, right, setRight, setMaxWidth]);

  return (
    <SAudioVisualizerAreaSelection
      ref={draggable}
      onDrop={event => event.preventDefault()}
      onDragEnter={onDragPrevent}
    >
      {/* Left Border */}
      {draggable && (
        <SSelector
          role="border-left"
          style={{ left: left + 'px', width: WIDTH }}
          onDragStart={event => onDragStart('left', event)}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          ref={leftBorder}
          draggable
        />
      )}

      {/* Highlighted Area */}
      {draggable && (
        <SSelectedArea
          ref={highlightArea}
          onDrop={event => event.preventDefault()}
          onDragEnter={onDragPrevent}
        />
      )}

      {/* Right Border */}
      {draggable && (
        <SSelector
          role="border-right"
          style={{ left: right + 'px', width: WIDTH }}
          onDragStart={event => onDragStart('right', event)}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          ref={rightBorder}
          draggable
        />
      )}
    </SAudioVisualizerAreaSelection>
  );
};
export default AudioVisualizerAreaSelection;
