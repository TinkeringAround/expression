import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Rhyme } from '../../../../../../store/phraser/types';
import { HighlightingType } from '../../../../../../lib/rhyme/types';

import Editor from './index';

import { AppMock } from '../../../../../../mock/components';
import { getRhymeMock } from '../../../../../../mock/phraser';
import { mockElectronTrigger } from '../../../../../../mock/electron';

describe('Editor', () => {
  const EditorInApp = (
    rhyme: Rhyme,
    highlighting: HighlightingType | null,
    value: string,
    setValue: (value: string) => void
  ) => (
    <AppMock>
      <Editor rhyme={rhyme} highlighting={highlighting} value={value} setValue={setValue} />
    </AppMock>
  );

  const noopFunction = () => {};

  test('should render textarea and highlighting overlay', () => {
    const rhyme = getRhymeMock();
    render(EditorInApp(rhyme, null, '', noopFunction));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(document.querySelector('.highlighting')).toBeInTheDocument();
  });

  test('should update textarea value when input changes and is below 4 rows', () => {
    const rhyme = getRhymeMock();
    const value = 'Test';
    const setValue = jest.fn();
    render(EditorInApp(rhyme, null, rhyme.lines.join('\n'), setValue));

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value } });
    });

    expect(setValue).toHaveBeenCalledWith(value);
  });

  test('should not update textarea value when input changes and is more than 4 rows', () => {
    const rhyme = getRhymeMock();
    const value = 'Eins\nZwei\nDrei\nVier\nFünf';
    const setValue = jest.fn();
    render(EditorInApp(rhyme, null, rhyme.lines.join('\n'), setValue));

    const textArea = screen.getByRole('textbox') as HTMLTextAreaElement;

    act(() => {
      fireEvent.change(textArea, { target: { value } });
    });

    expect(setValue).not.toHaveBeenCalled();
  });

  test('should update rhyme value in state when input changes and is below 4 rows', async () => {
    const rhyme = getRhymeMock();
    const value = 'Test';
    const updatePhraserSongPartRhymeMock = jest.fn();
    mockElectronTrigger(updatePhraserSongPartRhymeMock);

    render(EditorInApp(rhyme, null, value, noopFunction));

    const textArea = screen.getByRole('textbox');

    fireEvent.blur(textArea);

    expect(updatePhraserSongPartRhymeMock).toHaveBeenCalledWith(null, {
      rhymeId: rhyme.id,
      line: value
    });
  });

  test('should not update rhyme value in state when textArea blurs but does not differ', () => {
    const rhyme = getRhymeMock();
    const updatePhraserSongPartRhymeMock = jest.fn();
    mockElectronTrigger(updatePhraserSongPartRhymeMock);

    render(EditorInApp(rhyme, null, rhyme.lines.join('\n'), noopFunction));

    fireEvent.blur(screen.getByRole('textbox'));

    expect(updatePhraserSongPartRhymeMock).not.toHaveBeenCalled();
  });

  test('should mirror textarea scroll values when textare is overflown and scrolled', () => {
    const rhyme = getRhymeMock();
    render(EditorInApp(rhyme, null, rhyme.lines.join('\n'), noopFunction));

    const textArea = screen.getByRole('textbox') as HTMLTextAreaElement;

    act(() => {
      fireEvent.scroll(textArea, { target: { scrollLeft: 100, scrollTop: 200 } });
    });

    const highlightingDiv = document.querySelector('.highlighting') as HTMLDivElement;

    expect(highlightingDiv.scrollLeft).toBe(100);
    expect(highlightingDiv.scrollTop).toBe(200);
  });
});
