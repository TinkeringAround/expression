import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Rhyme } from '../../../../../store/phraser/types';

import PartRhyme from './index';

import { AppMock, DragDropDroppableWrapper } from '../../../../../mock/components';
import { getRhymeMock } from '../../../../../mock/collection';
import { mockElectronTrigger } from '../../../../../mock/electron';

describe('PartRhyme', () => {
  const PartRhymeInApp = (rhyme: Rhyme, index: number = 0) => (
    <AppMock>
      <DragDropDroppableWrapper>
        <PartRhyme rhyme={rhyme} index={index} />
      </DragDropDroppableWrapper>
    </AppMock>
  );

  it('should render editor-controls, textarea and highlighting overlay', () => {
    const rhyme = getRhymeMock();
    render(PartRhymeInApp(rhyme));

    expect(document.querySelector('.editor-controls')).toBeInTheDocument();
    expect(document.querySelector('.icon-trash')).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    expect(document.querySelector('.highlighting')).toBeInTheDocument();
  });

  it('should update textarea value when input changes and is below 4 rows', () => {
    const rhyme = getRhymeMock();
    const value = 'Test';
    render(PartRhymeInApp(rhyme));

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value } });
    });

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it('should update rhyme value in state when input changes and is below 4 rows', async () => {
    const rhyme = getRhymeMock();
    const value = 'Test';
    const updatePhraserSongPartRhymeMock = jest.fn();
    mockElectronTrigger(updatePhraserSongPartRhymeMock);

    render(PartRhymeInApp(rhyme));

    const textArea = screen.getByRole('textbox');

    act(() => {
      fireEvent.change(textArea, { target: { value } });
    });

    await waitFor(() => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });

    fireEvent.blur(textArea);

    expect(updatePhraserSongPartRhymeMock).toHaveBeenCalledWith(null, {
      rhymeId: rhyme.id,
      line: value
    });
  });

  it('should not update rhyme line in state when input changes and is below 4 rows', () => {
    const rhyme = getRhymeMock();
    const updatePhraserSongPartRhymeMock = jest.fn();
    mockElectronTrigger(updatePhraserSongPartRhymeMock);

    render(PartRhymeInApp(rhyme));

    fireEvent.blur(screen.getByRole('textbox'));

    expect(updatePhraserSongPartRhymeMock).not.toHaveBeenCalled();
  });

  it('should not update textarea value when input changes and is more than 4 rows', () => {
    const rhyme = getRhymeMock();
    const value = 'Eins\nZwei\nDrei\nVier\nFünf';
    render(PartRhymeInApp(rhyme));

    const textArea = screen.getByRole('textbox') as HTMLTextAreaElement;

    act(() => {
      fireEvent.change(textArea, { target: { value } });
    });

    expect(textArea.value.includes('Eins')).toBeFalsy();
  });

  it('should mirror textarea scroll values when textare is overflown and scrolled', () => {
    const rhyme = getRhymeMock();
    render(PartRhymeInApp(rhyme));

    const textArea = screen.getByRole('textbox') as HTMLTextAreaElement;

    act(() => {
      fireEvent.scroll(textArea, { target: { scrollLeft: 100, scrollTop: 200 } });
    });

    const highlightingDiv = document.querySelector('.highlighting') as HTMLDivElement;

    expect(highlightingDiv.scrollLeft).toBe(100);
    expect(highlightingDiv.scrollTop).toBe(200);
  });

  it('should delete rhyme in state when trash icon is clicked', () => {
    const rhyme = getRhymeMock();
    const deletePhraserSongPartRhymeMock = jest.fn();
    mockElectronTrigger(deletePhraserSongPartRhymeMock);

    render(PartRhymeInApp(rhyme));

    const trashIcon = document.querySelector('.icon-trash');

    if (trashIcon) {
      fireEvent.click(trashIcon);
    }

    expect(deletePhraserSongPartRhymeMock).toHaveBeenCalledWith(null, {
      rhymeId: rhyme.id
    });
  });
});
