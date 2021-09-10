import { DraggableLocation } from 'react-beautiful-dnd';

import { ACTION } from '../action-types';
import { useSnippet } from './index';

const { trigger, dispatch } = window.electron;

export const loadSnippets = () => dispatch(ACTION.loadSnippets);

export const updateSnippets = () => {
  const { snippets } = useSnippet.getState();
  dispatch(ACTION.updateSnippets, { snippets });
};

export const addSnippet = (lines: string[]) => trigger(ACTION.addSnippet, { lines });

export const deleteSnippet = (id: string) => trigger(ACTION.deleteSnippet, { id });

export const reorderSnippet = (source: DraggableLocation, destination: DraggableLocation) =>
  trigger(ACTION.reorderSnippet, {
    source,
    destination
  });
