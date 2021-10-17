import { ACTION } from '../action-types';

const { dispatch } = window.electron;

export const getSuggestion = (word: string) => dispatch(ACTION.getSuggestion, { word });
