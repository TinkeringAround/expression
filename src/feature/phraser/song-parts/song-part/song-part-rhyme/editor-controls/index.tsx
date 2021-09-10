import React, { FC, useCallback } from 'react';

import { Rhyme } from '../../../../../../store/phraser/types';
import { deletePhraserSongPartRhyme } from '../../../../../../store/phraser/actions';
import { addSnippet } from '../../../../../../store/snippet/actions';
import { HighlightingType } from '../../../../../../lib/rhyme/types';

import Icon from '../../../../../../component/icon';

import { SEditorControls } from './styled';

interface Props {
  rhyme: Rhyme;
  highlighting: HighlightingType | null;
  selectHighlighting: (type: HighlightingType) => void;
}

const EditorControls: FC<Props> = ({ rhyme, highlighting, selectHighlighting }) => {
  const isSelected = useCallback(
    (referenceHighlighting: HighlightingType) => {
      return highlighting === referenceHighlighting ? 'selected' : '';
    },
    [highlighting]
  );

  const rhymeToSnippet = useCallback(() => {
    addSnippet(rhyme.lines);
  }, [rhyme]);

  const deleteRhyme = useCallback(() => {
    deletePhraserSongPartRhyme(rhyme.id);
  }, [rhyme]);

  return (
    <SEditorControls>
      <div className="control-groups">
        <div className="group">
          <button
            className={isSelected(HighlightingType.VOCALS)}
            onClick={() => selectHighlighting(HighlightingType.VOCALS)}
          >
            <Icon iconType="text" title="Show Vocals" />
          </button>
          <button
            className={isSelected(HighlightingType.GROUPS)}
            onClick={() => selectHighlighting(HighlightingType.GROUPS)}
          >
            <Icon iconType="group" title="Show Rhymes" />
          </button>
        </div>

        <div className="group">
          <button onClick={rhymeToSnippet}>
            <Icon iconType="template" title="Save as Snippet" />
          </button>
        </div>
      </div>
      <Icon title="Delete Rhyme" iconType="trash" onClick={deleteRhyme} />
    </SEditorControls>
  );
};

export default EditorControls;
