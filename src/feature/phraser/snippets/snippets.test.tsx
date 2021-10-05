import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSnippet } from '../../../store/snippet';

import Snippets from './index';

import { AppMock } from '../../../mock/components';
import { getSnippetMock, getSnippetsMock } from '../../../mock/snippet';
import { mockElectronTrigger } from '../../../mock/electron';

describe('Snippets', () => {
  const SnippetsInApp = (
    <AppMock>
      <DragDropContext onDragEnd={() => {}}>
        <Snippets />
      </DragDropContext>
    </AppMock>
  );
  const firstSnippet = getSnippetMock({ lines: ['First Snippet'] });
  const secondSnippet = getSnippetMock({ id: '1112', lines: ['Second Snippet'] });

  test('should render all snippets', () => {
    const snippetsState = getSnippetsMock();
    useSnippet.setState(snippetsState);

    render(SnippetsInApp);

    snippetsState.snippets.forEach(snippet => {
      snippet.lines.forEach(line => {
        expect(screen.getByText(line)).toBeInTheDocument();
      });
    });
  });

  test('should filter snippets when search input changes', async () => {
    jest.useFakeTimers();
    const snippetsState = getSnippetsMock({ snippets: [firstSnippet, secondSnippet] });
    useSnippet.setState(snippetsState);

    render(SnippetsInApp);

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'SECOND' } });
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.queryByText(firstSnippet.lines[0])).not.toBeInTheDocument();
      expect(screen.getByText(secondSnippet.lines[0])).toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  test('should show all snippets when reset search input', () => {
    jest.useFakeTimers();
    const snippetsState = getSnippetsMock({ snippets: [firstSnippet, secondSnippet] });
    useSnippet.setState(snippetsState);

    render(SnippetsInApp);

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'SECOND' } });
      jest.advanceTimersByTime(500);

      const crossIcon = document.querySelector('.icon-cross');
      if (crossIcon) {
        fireEvent.click(crossIcon);
      }

      jest.advanceTimersByTime(500);
    });

    expect(screen.getByText(firstSnippet.lines[0])).toBeInTheDocument();
    expect(screen.getByText(secondSnippet.lines[0])).toBeInTheDocument();
    jest.useRealTimers();
  });

  test('should delete snippet when trash icon clicked', () => {
    const deleteSnippetMock = jest.fn();
    useSnippet.setState({ snippets: [firstSnippet] });
    mockElectronTrigger(deleteSnippetMock);

    render(SnippetsInApp);

    const trashIcon = document.querySelector('.icon-trash');
    if (trashIcon) {
      fireEvent.click(trashIcon);
    }

    expect(deleteSnippetMock).toHaveBeenCalledWith(null, { id: firstSnippet.id });
  });
});
