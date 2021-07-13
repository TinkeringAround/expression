import React, { FC, useEffect } from 'react';

import { useZoom } from '../../../hook/useZoom';
import { useSlicer } from '../../../store/slicer';
import { updateSlicerSelection } from '../../../store/slicer/actions';
import { useRefCallback } from '../../../hook/useRefCallback';

import AreaSelection from './area-selection';
import Drawing from './drawing';
import Loading from './loading';
import ExportingOverlay from './exporting-overlay';

import { SVisualizer } from './styled';

const Visualizer: FC = () => {
  const { file, isExporting } = useSlicer();
  const { ref, setRef } = useRefCallback();
  const { zoom, setZoom } = useZoom(ref);

  useEffect(() => {
    // reset zoom when file changes
    setZoom(1);
  }, [file, setZoom]);

  useEffect(() => {
    // update slicer selection zoom
    updateSlicerSelection({ zoom, ...(zoom === 1 ? { offset: 0 } : {}) });
  }, [zoom]);

  return (
    <SVisualizer role="visualizer" ref={setRef}>
      <Loading />
      <ExportingOverlay visible={isExporting} />
      {file && <AreaSelection />}
      {file && <Drawing />}
    </SVisualizer>
  );
};
export default Visualizer;
