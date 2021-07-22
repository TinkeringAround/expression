import React, { FC, useEffect } from 'react';

import { useZoom } from '../../../hook/useZoom';
import { useSlicer } from '../../../store/slicer';
import { updateSlicerSelection } from '../../../store/slicer/actions';
import { useRefCallback } from '../../../hook/useRefCallback';
import { useDebounce } from '../../../hook/useDebounce';

import AreaSelection from './area-selection';
import Drawing from './drawing';
import Loading from './loading';
import ExportingOverlay from './exporting-overlay';

import { SVisualizer } from './styled';
import If from '../../../component/if';

const DELAY = 100;

const Visualizer: FC = () => {
  const { file, isExporting } = useSlicer();
  const { ref, setRef } = useRefCallback();
  const { zoom, setZoom } = useZoom(ref);

  const debouncedZoom = useDebounce<number>(zoom, DELAY);

  useEffect(() => {
    // reset zoom when file changes
    setZoom(1);
  }, [file, setZoom]);

  useEffect(() => {
    // update slicer selection zoom
    updateSlicerSelection({ zoom: debouncedZoom, ...(debouncedZoom === 1 ? { offset: 0 } : {}) });
  }, [debouncedZoom]);

  return (
    <SVisualizer role="visualizer" ref={setRef}>
      <Loading />
      <ExportingOverlay visible={isExporting} />
      <If condition={!!file}>
        <AreaSelection />
        <Drawing zoom={zoom} />
      </If>
    </SVisualizer>
  );
};
export default Visualizer;
