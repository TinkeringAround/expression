import { ACTION } from '../action-types';
import {
  AddSnippetPayload,
  DeleteSnippetPayload,
  ReorderSnippetPayload,
  Snippet,
  SnippetsLoadedPayload
} from './types';
import { useSnippet } from './index';
import { generateId } from '../../lib/util';
import { useNotification } from '../notification';
import { Notification } from '../notification/types';

const { on } = window.electron;

// ==============================================================
export const snippetsLoadedRecipe = (_: null, { snippets, error }: SnippetsLoadedPayload) => {
  const { update } = useSnippet.getState();

  if (error) {
    const { update: updateNotifications, notifications } = useNotification.getState();
    notifications.push({ type: 'error', content: error });
    updateNotifications({ notifications });
  }

  update({ snippets });
};

export const addSnippetRecipe = (_: null, { lines }: AddSnippetPayload) => {
  const { update, snippets } = useSnippet.getState();
  const { update: notificationUpdate, notifications } = useNotification.getState();

  const snippet: Snippet = { id: generateId(), lines };
  const notification: Notification = { type: 'info', content: 'Snippet added.' };

  update({ snippets: [...snippets, snippet] });
  notificationUpdate({ notifications: [...notifications, notification] });
};

export const deleteSnippetRecipe = (_: null, { id }: DeleteSnippetPayload) => {
  const { update, snippets } = useSnippet.getState();

  const snippetIndex = snippets.findIndex(snippet => snippet.id === id);
  snippets.splice(snippetIndex, 1);

  update({ snippets });
};

export const reorderSnippetRecipe = (_: null, { source, destination }: ReorderSnippetPayload) => {
  const { update, snippets } = useSnippet.getState();

  if (source.index !== destination.index) {
    const snippet = snippets[source.index];
    snippets.splice(source.index, 1);
    snippets.splice(destination.index, 0, snippet);

    update({ snippets });
  }
};

// ==============================================================
on(ACTION.snippetsLoaded, snippetsLoadedRecipe);
on(ACTION.addSnippet, addSnippetRecipe);
on(ACTION.deleteSnippet, deleteSnippetRecipe);
on(ACTION.reorderSnippet, reorderSnippetRecipe);
