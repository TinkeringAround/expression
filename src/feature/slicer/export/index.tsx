import React, { FC, useCallback } from 'react';

import { useSlicer } from '../../../store/slicer';
import { exportSlicerFile } from '../../../store/slicer/actions';

import Button from '../../../component/button';
import Icon from '../../../component/icon';
import Shortcut from '../../../component/shortcut';

import { SExport } from './styled';

const Export: FC = () => {
  const { file, selection, isPlaying, isExporting } = useSlicer();

  const onExport = useCallback(() => {
    if (file) {
      exportSlicerFile(file, selection);
    }
  }, [file, selection]);

  const disabled = !file || isPlaying || isExporting;

  return (
    <SExport>
      <h1>Export Audio Slice</h1>
      <p>
        Using Slicer one can load wav-files, visualize them and export slices of these audio files
        using the interactive editor.
        <br />
        <br />
        The slices can be selected via (green) border manipulation, zooming and scrolling inside the
        editor.
        <br />
        <br />
        When paused, the selected audio slice can be exported to a wav-file via Save-Dialog on
        pressing the Export-Button.
      </p>
      <Button disabled={disabled} onClick={onExport}>
        <Icon iconType="save" />
        <span>Export</span>
        <Shortcut keyboard="E" withCtrl disabled={disabled} onClick={onExport} />
      </Button>
    </SExport>
  );
};

export default Export;
