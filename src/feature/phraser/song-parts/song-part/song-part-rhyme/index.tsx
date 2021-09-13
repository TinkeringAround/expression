import React, { FC, useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Rhyme } from '../../../../../store/phraser/types';
import { formatPhraserSongPartRhyme } from '../../../../../store/phraser/actions';
import { HighlightingType } from '../../../../../lib/rhyme/types';

import EditorControls from './editor-controls';
import Editor from './editor';
import { SRhyme } from './styled';

interface Props {
  rhyme: Rhyme;
  index: number;
}

export const RHYME_HEIGHT = 'calc(100px + 8.25rem)';

const SongPartRhyme: FC<Props> = ({ rhyme, index }) => {
  const [highlighting, setHighlighting] = useState<HighlightingType | null>(null);
  const [value, setValue] = useState<string>(rhyme.lines.join('\n'));

  const selectHighlighting = useCallback(
    selectedHighlighting => {
      if (highlighting === selectedHighlighting) {
        setHighlighting(null);
        return;
      }

      setHighlighting(selectedHighlighting);
    },
    [highlighting]
  );

  const formatRhyme = useCallback(() => {
    formatPhraserSongPartRhyme({ ...rhyme, lines: value.split('\n') });
  }, [rhyme, value]);

  return (
    <Draggable draggableId={rhyme.id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => (
        <SRhyme ref={innerRef} {...draggableProps} {...dragHandleProps}>
          <EditorControls
            rhyme={rhyme}
            highlighting={highlighting}
            selectHighlighting={selectHighlighting}
            formatRhyme={formatRhyme}
          />
          <Editor rhyme={rhyme} highlighting={highlighting} value={value} setValue={setValue} />
        </SRhyme>
      )}
    </Draggable>
  );
};

export default SongPartRhyme;
