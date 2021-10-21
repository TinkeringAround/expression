import { ACTION } from '../action-types';
import { useLibrary } from './index';

const { dispatch } = window.electron;

export const getSuggestion = (word: string) => {
  const { library } = useLibrary.getState();

  if (word !== '' && !library[word]) {
    dispatch(ACTION.getSuggestion, { word });
  }
};
