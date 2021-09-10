import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Rhyme } from '../../../../../../store/phraser/types';
import { HighlightingType } from '../../../../../../lib/rhyme/types';

import EditorControls from './index';

import { AppMock } from '../../../../../../mock/components';
import { getRhymeMock } from '../../../../../../mock/phraser';
import { mockElectronTrigger } from '../../../../../../mock/electron';

describe('Editor-Controls', () => {
  const EditorControlsInApp = (
    rhyme: Rhyme,
    highlighting: HighlightingType | null,
    selectHighlighting: any
  ) => (
    <AppMock>
      <EditorControls
        rhyme={rhyme}
        highlighting={highlighting}
        selectHighlighting={selectHighlighting}
      />
    </AppMock>
  );

  test('should render all control buttons and trash icon', () => {
    const rhyme = getRhymeMock();

    render(EditorControlsInApp(rhyme, null, () => {}));

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3);

    const trashIcon = document.querySelector('.icon-trash');
    expect(trashIcon).toBeInTheDocument();
  });

  test('should select vocals highlighting when vocal highlighting button clicked', () => {
    const rhyme = getRhymeMock();
    const selectHighlightingMock = jest.fn();

    render(EditorControlsInApp(rhyme, null, selectHighlightingMock));

    const textIcon = document.querySelector('.icon-text');

    if (textIcon) {
      fireEvent.click(textIcon);
    }

    expect(selectHighlightingMock).toHaveBeenCalledWith(HighlightingType.VOCALS);
  });

  test('should select group highlighting when group highlighting button clicked', () => {
    const rhyme = getRhymeMock();
    const selectHighlightingMock = jest.fn();

    render(EditorControlsInApp(rhyme, null, selectHighlightingMock));

    const groupIcon = document.querySelector('.icon-group');
    if (groupIcon) {
      fireEvent.click(groupIcon);
    }

    expect(selectHighlightingMock).toHaveBeenCalledWith(HighlightingType.GROUPS);
  });

  test('should select button when highlighting matches with button highlighting type', () => {
    const rhyme = getRhymeMock();

    render(EditorControlsInApp(rhyme, HighlightingType.VOCALS, () => {}));

    const selectedButton = document.querySelector('.selected');
    expect(selectedButton).toBeInTheDocument();
    expect(selectedButton?.querySelector('.icon-text')).toBeInTheDocument();
  });

  test('should export current rhyme to snippet', () => {
    const rhyme = getRhymeMock();
    const addSnippetMock = jest.fn();
    mockElectronTrigger(addSnippetMock);

    render(EditorControlsInApp(rhyme, null, () => {}));

    const templateIcon = document.querySelector('.icon-template');
    if (templateIcon) {
      fireEvent.click(templateIcon);
    }

    expect(addSnippetMock).toHaveBeenCalledWith(null, {
      lines: rhyme.lines
    });
  });

  test('should delete rhyme in state when trash icon is clicked', () => {
    const rhyme = getRhymeMock();
    const deletePhraserSongPartRhymeMock = jest.fn();
    mockElectronTrigger(deletePhraserSongPartRhymeMock);

    render(EditorControlsInApp(rhyme, null, () => {}));

    const trashIcon = document.querySelector('.icon-trash');
    if (trashIcon) {
      fireEvent.click(trashIcon);
    }

    expect(deletePhraserSongPartRhymeMock).toHaveBeenCalledWith(null, {
      rhymeId: rhyme.id
    });
  });
});
