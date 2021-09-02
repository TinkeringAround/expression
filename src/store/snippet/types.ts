import { Rhyme } from '../phraser/types';
import { HasError, HasId } from '../types';

export interface Snippet extends Rhyme {}

export interface SnippetsLoadedPayload extends HasError {
  snippets: Snippet[];
}

export interface AddSnippetPayload {
  lines: string[];
}

export interface DeleteSnippetPayload extends HasId {}
