import { Dict } from '../../lib/util';

export const LANGUAGES: Dict<string> = {
  en: 'English',
  de: 'German',
  fr: 'French'
};

export type WordSuggestions = Dict<string[]>;

export interface AddSuggestionPayload {
  word: string;
  suggestions: WordSuggestions;
}
