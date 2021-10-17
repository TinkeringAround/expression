import { ACTION } from '../action-types';
import {
  AddSuggestionPayload
} from './types';
import { useLibrary } from './index';

const { on } = window.electron;

// ==============================================================
export const addSuggestionRecipe = (_: null, { word, suggestions }: AddSuggestionPayload) => {
  const { update, library } = useLibrary.getState();

  const newLibrary = { ...library };
  newLibrary[word] = suggestions;

  update({ library: newLibrary });
};

// ==============================================================
on(ACTION.addSuggestion, addSuggestionRecipe);
