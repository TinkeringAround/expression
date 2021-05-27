import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';

import { useDrag } from '../../../../hook/useDrag';
import { useClientRect } from '../../../../hook/useClientRect';
import { bytesToMegaBytes, mapValues, asSeconds } from '../../../../util';

import { SAreaSelection, SSelector, SArea } from './styled';

const WIDTH = 7;
const UNDEFINED = 10000;
const AREA_THRESHOLD = 70;

interface Props {
  duration: number;
  size: number;
  zoom: number;
  offset: number;

  updateSelection: (start: number, end: number) => void;
}

const AreaSelection: FC<Props> = ({ duration, size, zoom, offset, updateSelection }) => {
  const { rect, ref } = useClientRect();

  const [maxWidth, setMaxWidth] = useState<number>(UNDEFINED);
  const [maxXLeft, setMaxXLeft] = useState<number>(UNDEFINED);

  // left border
  const {
    x: left,
    draggable: leftBorder,
    onDrag: onDragLeft,
    onDragStart: onDragStartLeft,
    onDragEnd: onDragEndLeft,
    onDragPrevent
  } = useDrag(0, maxXLeft, 0);

  // right border
  const {
    x: right,
    draggable: rightBorder,
    onDrag: onDragRight,
    onDragStart: onDragStartRight,
    onDragEnd: onDragEndRight
  } = useDrag(left + WIDTH, maxWidth, maxWidth);

  // helper to map selected width to duration slice
  const mapToSeconds = useCallback(
    (width: number) => mapValues(width, 0, maxWidth, 0, duration / zoom),
    [maxWidth, duration, zoom]
  );

  // selected duration
  const DurationSlice = useCallback(() => {
    const areaWidth = right - left - WIDTH;
    const estimatedSize = bytesToMegaBytes((size * areaWidth) / maxWidth);

    if (areaWidth >= AREA_THRESHOLD) {
      return (
        <Fragment>
          <span>{asSeconds(mapToSeconds(right - left - WIDTH))}</span>
          <span>{`~${estimatedSize}`}</span>
        </Fragment>
      );
    }

    return <Fragment />;
  }, [right, size, left, maxWidth, mapToSeconds]);

  // set initial max value
  useEffect(() => {
    rect && setMaxWidth(rect.width - WIDTH);
  }, [rect, setMaxWidth]);

  // update max left border value when right border position updates
  useEffect(() => {
    maxXLeft !== right && setMaxXLeft(right - WIDTH);
  }, [maxXLeft, right, setMaxXLeft]);

  // update Selection when border position changes
  useEffect(() => {
    updateSelection(left, right);
  }, [left, right, updateSelection]);

  return (
    <SAreaSelection role="selection" ref={ref} onDragEnter={onDragPrevent}>
      {/* Left Border */}
      {rect && (
        <SSelector
          role="border-left"
          ref={leftBorder}
          onDragStart={onDragStartLeft}
          onDragEnd={onDragEndLeft}
          onDrag={onDragLeft}
          draggable
          style={{ left, width: WIDTH }}
        >
          <span>{asSeconds(mapToSeconds(left) + offset)}</span>
        </SSelector>
      )}

      {/* Highlighted Area */}
      {rect && (
        <SArea
          role="area"
          style={{
            width: right - left - WIDTH,
            left: left + WIDTH
          }}
          onDragEnter={onDragPrevent}
        >
          <DurationSlice />
        </SArea>
      )}

      {/* Right Border */}
      {rect && (
        <SSelector
          role="border-right"
          ref={rightBorder}
          onDragStart={onDragStartRight}
          onDrag={onDragRight}
          onDragEnd={onDragEndRight}
          draggable
          style={{ left: right, width: WIDTH }}
        >
          <span>{asSeconds(mapToSeconds(right) + offset)}</span>
        </SSelector>
      )}
    </SAreaSelection>
  );
};
export default AreaSelection;
