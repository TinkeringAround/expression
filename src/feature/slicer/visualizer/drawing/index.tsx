import React, { FC, useCallback, useEffect, useState } from 'react';

import { calculateDrawingPoints } from './util';
import { findAbsoluteMax, sampleChannelData } from '../../../../audio';
import { useClientRect } from '../../../../hook/useClientRect';

import { SDrawing } from './styled';

type AudioData = {
  sample: number[];
  maxAmplitude: number;
};

interface Props {
  channelData: Float32Array[];
  zoom: number;
  samples: number;

  updateOffset: (offsetX: number) => void;
}

const PADDING = 50;
const UNDEFINED = -1;

const Drawing: FC<Props> = ({ channelData, samples, zoom, updateOffset: updateOffsetX }) => {
  const { rect, ref } = useClientRect();

  const [baseWidth, setBaseWidth] = useState<number>(UNDEFINED);
  const [svgWidth, setSvgWidth] = useState<string>('100%');
  const [data, setData] = useState<AudioData>();
  const [points, setPoints] = useState<string>('');

  // update scroll left as duration offset
  const updateOffset = useCallback(
    event => {
      // @ts-ignore
      const { scrollLeft } = event.target;
      updateOffsetX(scrollLeft / (baseWidth * zoom));
    },
    [updateOffsetX, baseWidth, zoom]
  );

  // calculate samples from channelData
  useEffect(() => {
    const sample = sampleChannelData(channelData[0], samples);
    setData({
      sample,
      // max absolute amplitude of data array
      maxAmplitude: findAbsoluteMax(sample)
    });
  }, [channelData, samples]);

  // set initial base width for svg
  useEffect(() => {
    rect && setBaseWidth(rect.width);
  }, [rect, setBaseWidth]);

  // update points and svg width on zoom change
  useEffect(() => {
    if (rect && data && zoom && baseWidth !== UNDEFINED) {
      const { sample, maxAmplitude } = data;
      const { height } = rect;

      // max Height for value
      const maxHeight = Math.floor(height / 2);

      // step width
      const stepWidth = (baseWidth * zoom) / samples;

      // svg width according to zoom level
      setSvgWidth(`${100 * zoom}%`);

      // points to be drawn
      setPoints(calculateDrawingPoints(sample, maxAmplitude, stepWidth, maxHeight, PADDING));
    }
  }, [rect, data, samples, zoom, baseWidth, setSvgWidth, setPoints]);

  return (
    <SDrawing role="drawing" ref={ref} onScroll={updateOffset}>
      <svg style={{ width: svgWidth }}>
        <polyline points={points} />
      </svg>
    </SDrawing>
  );
};

export default Drawing;
