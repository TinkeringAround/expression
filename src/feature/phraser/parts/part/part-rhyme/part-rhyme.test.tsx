import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Rhyme } from '../../../../../store/phraser/types';
import { toName } from '../../../../../lib/rhyme';

import PartRhyme from './index';

import { AppMock, DragDropDroppableWrapper } from '../../../../../mock/components';
import { getRhymeMock } from '../../../../../mock/collection';

describe('PartRhyme', () => {
  const PartRhymeInApp = (rhyme: Rhyme, index: number = 0) => (
    <AppMock>
      <DragDropDroppableWrapper>
        <PartRhyme rhyme={rhyme} index={index} />
      </DragDropDroppableWrapper>
    </AppMock>
  );

  it('should render pattern, textarea and highlighting Overlay', () => {
    const rhyme = getRhymeMock();
    render(PartRhymeInApp(rhyme));

    expect(screen.getByText(toName(rhyme.pattern))).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
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
});
