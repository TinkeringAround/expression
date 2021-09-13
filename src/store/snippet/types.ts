import { Rhyme } from '../phraser/types';
import { HasDestination, HasError, HasId, HasSource } from '../types';

export interface Snippet extends Rhyme {}

export interface SnippetsLoadedPayload extends HasError {
  snippets: Snippet[];
}

export interface AddSnippetPayload {
  lines: string[];
}

export interface DeleteSnippetPayload extends HasId {}

export interface ReorderSnippetPayload extends HasSource, HasDestination {}
