import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

import { Rhyme } from '../../../../../../store/phraser/types';
import { updatePhraserSongPartRhyme } from '../../../../../../store/phraser/actions';
import { useRefCallback } from '../../../../../../hook/useRefCallback';
import { HighlightingType } from '../../../../../../lib/rhyme/types';
import { Highlighting } from '../../../../../../lib/rhyme/highlighting';

import For from '../../../../../../component/for';

import { SEditor } from './styled';

const PLACEHOLDER = 'Type in Rhyme here...';

interface Props {
  rhyme: Rhyme;
  highlighting: HighlightingType | null;
}

const Editor: FC<Props> = ({ rhyme, highlighting }) => {
  const { ref: highlightArea, setRef } = useRefCallback();
  const [value, setValue] = useState<string>(rhyme.lines.join('\n'));
  const [highlightedLineBlocks, setHighlightedLineBlocks] = useState(
    Highlighting.apply(value.split('\n'), highlighting)
  );

  const onChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
      const rows = value.split('\n').length;
      if (rows <= 4) {
        setValue(value);
      }
    },
    [setValue]
  );

  const updateRhyme = useCallback(() => {
    if (rhyme.lines.join('\n') !== value) {
      updatePhraserSongPartRhyme(rhyme.id, value);
    }
  }, [rhyme, value]);

  const onScroll = useCallback(
    ({ target }: React.UIEvent<HTMLTextAreaElement>) => {
      if (highlightArea) {
        (highlightArea as HTMLDivElement).scrollLeft = (target as HTMLTextAreaElement).scrollLeft;
        (highlightArea as HTMLDivElement).scrollTop = (target as HTMLTextAreaElement).scrollTop;
      }
    },
    [highlightArea]
  );

  useEffect(() => {
    setHighlightedLineBlocks(Highlighting.apply(value.split('\n'), highlighting));
  }, [value, setValue, highlighting, setHighlightedLineBlocks]);

  return (
    <SEditor>
      <textarea
        rows={4}
        spellCheck={false}
        placeholder={PLACEHOLDER}
        value={value}
        onChange={onChange}
        onScroll={onScroll}
        onBlur={updateRhyme}
      />
      <div className="highlighting" ref={setRef}>
        {highlightedLineBlocks.map((line, index) => (
          <div key={`line-${index}`}>
            <For
              values={line}
              projector={({ text, color }, index) => (
                <span key={index} className={color ?? ''}>
                  {text}
                </span>
              )}
            />
          </div>
        ))}
      </div>
    </SEditor>
  );
};

export default Editor;
