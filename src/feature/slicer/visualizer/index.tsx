import React, { FC, Fragment, useCallback, useEffect } from 'react';

import { useStore } from '../../../store';
import { updateSlicerSelection } from '../../../store/actions';
import { useZoom } from '../../../hook/useZoom';
import { SlicerAudioFile } from '../../../store/types';

import AreaSelection from './area-selection';
import AudioDrawing from './drawing';

const Visualizer: FC = () => {
  const { file, selection } = useStore(state => state.slicer);
  const zoom = useZoom();

  // update start and end in selection state
  const updateSelection = useCallback(
    (start: number, end: number) => {
      if (selection.start !== start || selection.end !== end) {
        updateSlicerSelection({ ...selection, start, end });
      }
    },
    [selection]
  );

  // update offset in seconds in selection state
  const updateOffset = useCallback(
    (offsetX: number) => {
      if (file) {
        const offset = offsetX * file.buffer.duration;

        if (selection.offset !== offset) {
          updateSlicerSelection({ ...selection, offset });
        }
      }
    },
    [file, selection]
  );

  // Area Selection
  const Selection = useCallback(
    ({ buffer, size }: SlicerAudioFile) => (
      <AreaSelection
        duration={buffer.duration}
        size={size}
        zoom={selection.zoom}
        offset={selection.offset}
        updateSelection={updateSelection}
      />
    ),
    [selection, updateSelection]
  );

  // Audio Drawing
  const Drawing = useCallback(
    ({ channelData }: SlicerAudioFile) => (
      <AudioDrawing
        channelData={channelData}
        zoom={selection.zoom}
        samples={5000}
        updateOffset={updateOffset}
      />
    ),
    [selection, updateOffset]
  );

  // update zoom in selection state
  useEffect(() => {
    if (selection.zoom !== zoom) updateSlicerSelection({ ...selection, zoom });
  }, [selection, zoom]);

  return (
    <Fragment>
      {file && Selection(file)}
      {file && Drawing(file)}
    </Fragment>
  );
};

export default Visualizer;
