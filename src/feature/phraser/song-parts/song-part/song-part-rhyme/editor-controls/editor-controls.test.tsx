import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
    selectHighlighting: any,
    formatRhyme: any
  ) => (
    <AppMock>
      <EditorControls
        rhyme={rhyme}
        highlighting={highlighting}
        selectHighlighting={selectHighlighting}
        formatRhyme={formatRhyme}
      />
    </AppMock>
  );
  const noopFunction = () => {};

  test('should render all control buttons and trash icon', () => {
    const rhyme = getRhymeMock();

    render(EditorControlsInApp(rhyme, null, noopFunction, noopFunction));

    const buttons = document.querySelectorAll('.button');
    expect(buttons.length).toBe(5);
  });

  test('should select vocals highlighting when vocal highlighting button clicked', () => {
    const rhyme = getRhymeMock();
    const selectHighlightingMock = jest.fn();

    render(EditorControlsInApp(rhyme, null, selectHighlightingMock, noopFunction));

    const textIcon = document.querySelector('.icon-text');

    if (textIcon) {
      fireEvent.click(textIcon);
    }

    expect(selectHighlightingMock).toHaveBeenCalledWith(HighlightingType.VOCALS);
  });

  test('should select group highlighting when group highlighting button clicked', () => {
    const rhyme = getRhymeMock();
    const selectHighlightingMock = jest.fn();

    render(EditorControlsInApp(rhyme, null, selectHighlightingMock, noopFunction));

    const groupIcon = document.querySelector('.icon-group');
    if (groupIcon) {
      fireEvent.click(groupIcon);
    }

    expect(selectHighlightingMock).toHaveBeenCalledWith(HighlightingType.GROUPS);
  });

  test('should select button when highlighting matches with button highlighting type', () => {
    const rhyme = getRhymeMock();

    render(EditorControlsInApp(rhyme, HighlightingType.VOCALS, noopFunction, noopFunction));

    const selectedButton = document.querySelector('.selected');
    expect(selectedButton).toBeInTheDocument();
    expect(selectedButton?.querySelector('.icon-text')).toBeInTheDocument();
  });

  test('should request format of current editor value', () => {
    const rhyme = getRhymeMock();
    const requestFormatMock = jest.fn();

    render(EditorControlsInApp(rhyme, null, noopFunction, requestFormatMock));

    const formatIcon = document.querySelector('.icon-format');
    if (formatIcon) {
      fireEvent.click(formatIcon);
    }

    expect(requestFormatMock).toHaveBeenCalled();
  });

  test('should export current rhyme to snippet', () => {
    const rhyme = getRhymeMock();
    const addSnippetMock = jest.fn();
    mockElectronTrigger(addSnippetMock);

    render(EditorControlsInApp(rhyme, null, noopFunction, noopFunction));

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

    render(EditorControlsInApp(rhyme, null, noopFunction, noopFunction));

    const trashIcon = document.querySelector('.icon-trash');
    if (trashIcon) {
      fireEvent.click(trashIcon);
    }

    expect(deletePhraserSongPartRhymeMock).toHaveBeenCalledWith(null, {
      rhymeId: rhyme.id
    });
  });
});
