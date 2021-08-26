import React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { usePhraser } from '../../store/phraser';
import { Template } from '../../store/phraser/types';

import Phraser from './index';
import { TEMPLATES } from './templates';

import { AppMock } from '../../mock/components';
import { getDropResultMock } from '../../mock/window';
import { mockElectronTrigger } from '../../mock/electron';

describe('Phraser', () => {
  const PhraserInApp = (testDrop?: DropResult) => (
    <AppMock>
      <Phraser {...(testDrop ? { testDrop } : {})} />
    </AppMock>
  );

  const initialPhraserState = usePhraser.getState();

  beforeEach(() => {
    usePhraser.setState(initialPhraserState);
  });

  test('should render phraser', () => {
    // test condition if testDrop is not present
    render(PhraserInApp());
  });

  test('should ignore drop when destination is undefined', () => {
    render(PhraserInApp(getDropResultMock({ destination: undefined })));

    act(() => {
      fireEvent.click(screen.getByText(/Collections/));
    });
  });

  test('should add song when template is dropped on part', () => {
    const addPhraserSongPartRhymeMock = jest.fn();
    const destination = { index: 0, droppableId: '' };
    mockElectronTrigger(addPhraserSongPartRhymeMock);

    render(
      PhraserInApp(
        getDropResultMock({
          draggableId: 'SINGLE',
          destination,
          source: { index: 0, droppableId: TEMPLATES }
        })
      )
    );

    act(() => {
      fireEvent.click(screen.getByText(/Collections/));
    });

    expect(addPhraserSongPartRhymeMock).toHaveBeenCalledWith(null, {
      template: Template.SINGLE,
      destination
    });
  });

  test('should reorder rhymes when rhymes are reordered', () => {
    const reorderPhraserSongPartRhyme = jest.fn();
    const destination = { index: 0, droppableId: '' };
    const source = { index: 1, droppableId: '' };
    mockElectronTrigger(reorderPhraserSongPartRhyme);

    render(PhraserInApp(getDropResultMock({ destination, source })));

    act(() => {
      fireEvent.click(screen.getByText(/Collections/));
    });

    expect(reorderPhraserSongPartRhyme).toHaveBeenCalledWith(null, { source, destination });
  });

  test('should move rhyme to another parth when rhyme is moved', () => {
    const movePhraserSongPartRhyme = jest.fn();
    const destination = { index: 0, droppableId: '1' };
    const source = { index: 1, droppableId: '2' };
    mockElectronTrigger(movePhraserSongPartRhyme);

    render(PhraserInApp(getDropResultMock({ destination, source })));

    act(() => {
      fireEvent.click(screen.getByText(/Collections/));
    });

    expect(movePhraserSongPartRhyme).toHaveBeenCalledWith(null, { source, destination });
  });
});
