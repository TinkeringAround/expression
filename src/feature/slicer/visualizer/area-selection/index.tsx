import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';

import { useDrag } from '../../../../hook/useDrag';
import { useClientRect } from '../../../../hook/useClientRect';
import { toMB, map, asSeconds } from '../../../../util';
import { useSlicer } from '../../../../store/slicer';
import { selectSlicerFile, selectSlicerSelection } from '../../../../store/slicer/selector';
import { updateSlicerSelection } from '../../../../store/slicer/actions';
import { useRefCallback } from '../../../../hook/useRefCallback';

import Marker from './marker';

import { SAreaSelection, SSelector, SArea } from './styled';

export const BORDER_WIDTH = 7;
const UNDEFINED = BORDER_WIDTH;
const AREA_THRESHOLD = 70;

const AreaSelection: FC = () => {
  const { file } = useSlicer();
  const { buffer, size } = useSlicer(selectSlicerFile);
  const { zoom } = useSlicer(selectSlicerSelection);
  const { ref, setRef } = useRefCallback();
  const { rect } = useClientRect(ref, true);

  const [maxWidth, setMaxWidth] = useState<number>(UNDEFINED);
  const [maxXLeft, setMaxXLeft] = useState<number>(UNDEFINED);
  const [areaWidth, setAreaWidth] = useState<number>(UNDEFINED);

  // left border
  const {
    x: left,
    draggable: leftBorder,
    onDrag: onDragLeft,
    onDragStart: onDragStartLeft,
    onDragEnd: onDragEndLeft,
    reset: resetLeftBorder,
    onDragPrevent
  } = useDrag(0, maxXLeft, 0);

  // right border
  const {
    x: right,
    draggable: rightBorder,
    onDrag: onDragRight,
    onDragStart: onDragStartRight,
    onDragEnd: onDragEndRight,
    reset: resetRightBorder
  } = useDrag(left + BORDER_WIDTH, maxWidth - BORDER_WIDTH, maxWidth - BORDER_WIDTH);

  const reset = () => {
    resetLeftBorder();
    resetRightBorder();
  };

  // helper to map a length/width/position to a duration in seconds
  const toTime = useCallback(
    (value: number) => map(value, 0, maxWidth - BORDER_WIDTH, 0, buffer.duration / zoom),
    [maxWidth, buffer, zoom]
  );

  const DurationSlice = useCallback(() => {
    const show = areaWidth >= AREA_THRESHOLD;
    const areaTimeSlice = toTime(areaWidth);
    const displayDuration = show ? asSeconds(areaTimeSlice, 1) : '';
    const estimatedSize = show ? `~${toMB((size * areaTimeSlice) / buffer.duration)}` : '';

    return (
      <Fragment>
        <span>{displayDuration}</span>
        <span>{estimatedSize}</span>
      </Fragment>
    );
  }, [areaWidth, buffer, size, toTime]);

  useEffect(() => {
    // reset border when file changes
    // dont use reset function of useDrag directly because
    // it will re-trigger the reset on resize
    file && reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    // update area width when border position changes
    setAreaWidth(right - left);
  }, [right, left, setAreaWidth]);

  useEffect(() => {
    // set initial max value
    rect && setMaxWidth(rect.width);
  }, [rect, setMaxWidth]);

  useEffect(() => {
    // update max left border value when right border position updates
    maxXLeft !== right && setMaxXLeft(right - BORDER_WIDTH);
  }, [maxXLeft, right, setMaxXLeft]);

  useEffect(() => {
    // update start in selection state when border left position changes
    updateSlicerSelection({ start: toTime(left) });
  }, [left, toTime]);

  useEffect(() => {
    // update end in selection state when border right position changes
    updateSlicerSelection({ end: toTime(right + BORDER_WIDTH) });
  }, [right, toTime]);

  return (
    <SAreaSelection role="selection" ref={setRef} onDragEnter={onDragPrevent}>
      {/* Left Border */}
      <SSelector
        role="border-left"
        ref={leftBorder}
        onDragStart={onDragStartLeft}
        onDragEnd={onDragEndLeft}
        onDrag={onDragLeft}
        draggable
        style={{ left, width: BORDER_WIDTH }}
      />

      {/* Highlighted Area */}
      <SArea
        role="area"
        style={{ width: right - left - BORDER_WIDTH, left: left + BORDER_WIDTH }}
        onDragEnter={onDragPrevent}
      >
        <Marker />
        <DurationSlice />
      </SArea>

      {/* Right Border */}
      <SSelector
        role="border-right"
        ref={rightBorder}
        onDragStart={onDragStartRight}
        onDrag={onDragRight}
        onDragEnd={onDragEndRight}
        draggable
        style={{ left: right, width: BORDER_WIDTH }}
      />
    </SAreaSelection>
  );
};
export default AreaSelection;
