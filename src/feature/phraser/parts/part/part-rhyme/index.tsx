import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Rhyme } from '../../../../../store/phraser/types';
import { highlightVocals } from '../../../../../lib/rhyme';
import { useRefCallback } from '../../../../../hook/useRefCallback';
import {
  deletePhraserSongPartRhyme,
  updatePhraserSongPartRhyme
} from '../../../../../store/phraser/actions';

import For from '../../../../../component/for';
import Icon from '../../../../../component/icon';

import { SRhyme } from './styled';

interface Props {
  rhyme: Rhyme;
  index: number;
}

export const RHYME_HEIGHT = 'calc(100px + 6.25rem)';
const PLACEHOLDER = 'Type in Rhyme here...';

const PartRhyme: FC<Props> = ({ rhyme, index }) => {
  const { ref: highlightArea, setRef } = useRefCallback();
  const [currentValue, setCurrentValue] = useState<string>(rhyme.lines.join('\n'));

  const onChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
      const rows = value.split('\n').length;
      if (rows <= 4) {
        setCurrentValue(value);
      }
    },
    [setCurrentValue]
  );

  const updateRhyme = useCallback(() => {
    if (rhyme.lines.join('\n') !== currentValue) {
      updatePhraserSongPartRhyme(rhyme.id, currentValue);
    }
  }, [rhyme, currentValue]);

  const deleteRhyme = useCallback(() => {
    deletePhraserSongPartRhyme(rhyme.id);
  }, [rhyme]);

  const onScroll = useCallback(
    ({ target }: React.UIEvent<HTMLTextAreaElement>) => {
      if (highlightArea) {
        (highlightArea as HTMLDivElement).scrollLeft = (target as HTMLTextAreaElement).scrollLeft;
        (highlightArea as HTMLDivElement).scrollTop = (target as HTMLTextAreaElement).scrollTop;
      }
    },
    [highlightArea]
  );

  return (
    <Draggable draggableId={rhyme.id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => (
        <SRhyme ref={innerRef} {...draggableProps} {...dragHandleProps}>
          <div className="editor-controls">
            <Icon title="Delete Rhyme" iconType="trash" onClick={deleteRhyme} />
          </div>
          <div className="editor">
            <textarea
              rows={4}
              spellCheck={false}
              placeholder={PLACEHOLDER}
              value={currentValue}
              onChange={onChange}
              onScroll={onScroll}
              onBlur={updateRhyme}
            />
            <div className="highlighting" ref={setRef}>
              {currentValue.split('\n').map((line, index) => (
                <div key={`line-${index}`}>
                  <For
                    values={highlightVocals(line)}
                    projector={({ text, color }, index) => (
                      <span key={index} className={color ?? ''}>
                        {text}
                      </span>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </SRhyme>
      )}
    </Draggable>
  );
};

export default PartRhyme;
