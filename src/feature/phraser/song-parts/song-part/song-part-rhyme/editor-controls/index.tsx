import React, { FC, useCallback } from 'react';

import { Rhyme } from '../../../../../../store/phraser/types';
import { deletePhraserSongPartRhyme } from '../../../../../../store/phraser/actions';
import { addSnippet } from '../../../../../../store/snippet/actions';
import { HighlightingType } from '../../../../../../lib/rhyme/types';
import { anyFunction } from '../../../../../../lib/util';

import Icon from '../../../../../../component/icon';

import { SEditorControls } from './styled';

interface Props {
  rhyme: Rhyme;
  highlighting: HighlightingType | null;
  selectHighlighting: (type: HighlightingType) => void;
  formatRhyme: anyFunction;
}

const EditorControls: FC<Props> = ({ rhyme, highlighting, selectHighlighting, formatRhyme }) => {
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
          <div
            title="Show Vocals"
            className={`button ${isSelected(HighlightingType.VOCALS)}`}
            onClick={() => selectHighlighting(HighlightingType.VOCALS)}
          >
            <Icon iconType="text" />
          </div>
          <div
            title="Show Rhymes"
            className={`button ${isSelected(HighlightingType.GROUPS)}`}
            onClick={() => selectHighlighting(HighlightingType.GROUPS)}
          >
            <Icon iconType="group" />
          </div>
        </div>

        <div className="group">
          <div title="Format Rhyme" className="button" onClick={formatRhyme}>
            <Icon iconType="format" />
          </div>
        </div>

        <div className="group">
          <div title="Save as Snippet" className="button" onClick={rhymeToSnippet}>
            <Icon iconType="template" />
          </div>
        </div>

        <div className="group">
          <div title="Delete Rhyme" className="button" onClick={deleteRhyme}>
            <Icon iconType="trash" />
          </div>
        </div>
      </div>
    </SEditorControls>
  );
};

export default EditorControls;
