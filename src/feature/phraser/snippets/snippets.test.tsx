import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSnippet } from '../../../store/snippet';
import { Snippet } from '../../../store/snippet/types';

import Snippets from './index';

import { AppMock } from '../../../mock/components';
import { getSnippetsMock } from '../../../mock/snippet';
import { mockElectronTrigger } from '../../../mock/electron';

describe('Snippets', () => {
  const SnippetsInApp = (
    <AppMock>
      <DragDropContext onDragEnd={() => {}}>
        <Snippets />
      </DragDropContext>
    </AppMock>
  );

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

  test('should delete snippet when trash icon clicked', () => {
    const snippet: Snippet = { id: '1', lines: ['line'] };
    const deleteSnippetMock = jest.fn();
    useSnippet.setState({ snippets: [snippet] });
    mockElectronTrigger(deleteSnippetMock);

    render(SnippetsInApp);

    const trashIcon = document.querySelector('.icon-trash');
    if (trashIcon) {
      fireEvent.click(trashIcon);
    }

    expect(deleteSnippetMock).toHaveBeenCalledWith(null, { id: snippet.id });
  });
});
