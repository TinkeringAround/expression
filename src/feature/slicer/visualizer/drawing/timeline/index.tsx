import React, { FC, useCallback, useEffect, useState } from 'react';

import { asSeconds, map } from '../../../../../lib/util';

import { STimeline } from './styled';

const PADDING_BOTTOM = 60;

type TextProp = {
  x: number;
  y: number;
  text: string;
};

interface Props {
  duration: number;
  zoom: number;

  height: number;
  width: number;
}

const Timeline: FC<Props> = ({ duration, zoom, height, width }) => {
  const [count, setCount] = useState<number>(1);
  const [stepWidth, setStepWidth] = useState<number>(0);
  const [baselinePoints, setBaselinePoints] = useState<string>('');
  const [stepTexts, setStepTexts] = useState<TextProp[]>([]);
  const [stepPoints, setStepPoints] = useState<string>('');
  const [linePoints, setLinePoints] = useState<string>('');

  // helper to map selected width to duration slice
  const toSeconds = useCallback((value: number) => map(value, 0, width, 0, duration / zoom), [
    width,
    duration,
    zoom
  ]);

  useEffect(() => {
    const x = Math.ceil(duration / zoom);

    let count;
    if (x < 5) count = duration * 2;
    else if (x < 10) count = duration;
    else if (x < 20) count = duration / 2;
    else if (x < 100) count = duration / 5;
    else count = duration / 10;

    setCount(count);
  }, [duration, zoom, setCount]);

  useEffect(() => {
    setStepWidth((zoom * width) / count);
  }, [zoom, width, count, setStepWidth]);

  useEffect(() => {
    const y = height - PADDING_BOTTOM;
    setBaselinePoints(`0,${y} ${zoom * width},${y}`);
  }, [height, width, zoom]);

  useEffect(() => {
    const y = height - PADDING_BOTTOM;

    const newStepTexts: TextProp[] = [];
    let newStepPoints = '';
    let newLinePoints = '';

    Array.from({ length: count }, (_, i) => (i + 1) * stepWidth).forEach(x => {
      newStepTexts.push({ x, y: y + 15, text: `${asSeconds(toSeconds(x), 1)}` });
      newStepPoints += ` ${x},${y} ${x},${y - 5} ${x},${y + 5} ${x},${y}`;
      newLinePoints += ` ${x},-2 ${x},${y - 3} ${x},-2`;
    });

    setStepTexts(newStepTexts);
    setStepPoints(newStepPoints);
    setLinePoints(newLinePoints);
  }, [
    stepWidth,
    count,
    height,
    width,
    zoom,
    toSeconds,
    setLinePoints,
    setStepPoints,
    setStepTexts
  ]);

  return (
    <STimeline
      role="timeline"
      style={{ height: height - PADDING_BOTTOM + 20, width: `${100 * zoom}%` }}
    >
      {/* Baseline */}
      <polyline role="baseline" points={baselinePoints} />

      {/* Steps */}
      <polyline role="step" points={stepPoints} />

      {/* Lines */}
      <polyline role="line" points={linePoints} />

      {/* Texts */}
      {stepTexts.map(({ x, y, text }, index) => (
        <text key={`text-${index}`} x={x} y={y}>
          {text}
        </text>
      ))}
    </STimeline>
  );
};

export default Timeline;
