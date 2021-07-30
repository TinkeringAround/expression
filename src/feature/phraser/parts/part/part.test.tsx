import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Part } from '../../../../store/phraser/types';

import SongPart from './index';

import { AppMock } from '../../../../mock/components';
import { getPartMock } from '../../../../mock/collection';
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
    const part = getPartMock();
    render(SongPartInApp(part));

    const toggleIcon = document.querySelector('.icon-arrow-double-down');
    const deleteIcon = document.querySelector('.icon-trash');
    const textArea = screen.getByRole('textbox');

    expect(toggleIcon).toBeInTheDocument();
    expect(deleteIcon).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();
  });

  it('should update song part name when song part name is changed', async () => {
    const partTitle = 'new-title';
    const part = getPartMock();
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

  it('should not update song part name when song part name does not differ', () => {
    const part = getPartMock();
    const updatePhraserSongPartNameMock = jest.fn();

    mockElectronTrigger(updatePhraserSongPartNameMock);
    render(SongPartInApp(part));

    fireEvent.blur(screen.getByRole('textbox'));

    expect(updatePhraserSongPartNameMock).not.toHaveBeenCalled();
  });

  it('should delete part when delete part icon is clicked', () => {
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

  it('should render rhymes when song part is expanded', () => {
    const part = getPartMock();
    const { rhymes } = part;
    render(SongPartInApp(part));

    const toggleIcon = document.querySelector('.icon-arrow-double-down');

    if (toggleIcon) {
      act(() => {
        fireEvent.click(toggleIcon);
      });
    }

    expect(document.querySelectorAll('.editor').length).toBe(rhymes.length);
  });
});
