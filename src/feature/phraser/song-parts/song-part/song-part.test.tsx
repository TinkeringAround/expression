import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Part } from '../../../../store/phraser/types';

import SongPart from './index';

import { AppMock } from '../../../../mock/components';
import { getPartMock } from '../../../../mock/phraser';
import { mockElectronTrigger } from '../../../../mock/electron';

describe('SongPart', () => {
  const SongPartInApp = (part: Part) => (
    <AppMock>
      <DragDropContext onDragEnd={() => {}}>
        <SongPart part={part} />
      </DragDropContext>
    </AppMock>
  );

  it('should render icons and song title', () => {
    const part = getPartMock({ rhymes: [] });
    render(SongPartInApp(part));

    const toggleIcon = document.querySelector('.icon-arrow-double-up');
    const deleteIcon = document.querySelector('.icon-trash');
    const textArea = screen.getByRole('textbox');

    expect(toggleIcon).toBeInTheDocument();
    expect(deleteIcon).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();
  });

  it('should update song song-part name when song song-part name is changed', async () => {
    const partTitle = 'new-title';
    const part = getPartMock({ rhymes: [] });
    const updatePhraserSongPartNameMock = jest.fn();

    mockElectronTrigger(updatePhraserSongPartNameMock);
    render(SongPartInApp(part));

    const textArea = screen.getByRole('textbox') as HTMLTextAreaElement;

    act(() => {
      fireEvent.change(textArea, { target: { value: partTitle } });
    });

    await waitFor(() => {
      expect(textArea.value).toBe(partTitle);
    });

    fireEvent.blur(textArea);

    expect(updatePhraserSongPartNameMock).toHaveBeenCalledWith(null, {
      partId: part.id,
      name: partTitle
    });
  });

  it('should not update song song-part name when song song-part name does not differ', () => {
    const part = getPartMock({ rhymes: [] });
    const updatePhraserSongPartNameMock = jest.fn();

    mockElectronTrigger(updatePhraserSongPartNameMock);
    render(SongPartInApp(part));

    fireEvent.blur(screen.getByRole('textbox'));

    expect(updatePhraserSongPartNameMock).not.toHaveBeenCalled();
  });

  it('should delete song-part when delete song-part icon is clicked', () => {
    const part = getPartMock();
    const deletePhraserSongPartMock = jest.fn();

    mockElectronTrigger(deletePhraserSongPartMock);
    render(SongPartInApp(part));

    const deleteIcon = document.querySelector('.icon-trash');

    if (deleteIcon) {
      fireEvent.click(deleteIcon);
    }

    expect(deletePhraserSongPartMock).toHaveBeenCalledWith(null, {
      partId: part.id
    });
  });

  test('should collapse song-part when click on toggle button', () => {
    const part = getPartMock({
      rhymes: [
        {
          id: '1',
          lines: ['line']
        }
      ]
    });
    render(SongPartInApp(part));

    const toggleIcon = document.querySelector('.icon-arrow-double-up');

    if (toggleIcon) {
      act(() => {
        fireEvent.click(toggleIcon);
      });
    }

    expect(screen.queryByText('line')).not.toBeInTheDocument();
  });

  it('should render rhymes when song song-part is expanded', () => {
    const part = getPartMock();
    render(SongPartInApp(part));

    expect(document.querySelectorAll('textarea').length).toBe(part.rhymes.length);
  });
});
