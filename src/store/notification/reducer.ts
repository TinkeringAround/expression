import { ACTION } from '../action-types';
import { AddNotificationPayload, HideNotificationPayload } from './types';
import { useNotification } from './index';

const { on } = window.electron;

// ==============================================================
export const addNotificationRecipe = (_: null, { notification }: AddNotificationPayload) => {
  const { update, notifications } = useNotification.getState();

  update({
    notifications: [...notifications, notification]
  });
};

export const hideNotificationRecipe = (_: null, { notification }: HideNotificationPayload) => {
  const { update, notifications } = useNotification.getState();

  const index = notifications.findIndex(n => n.content === notification.content);
  if (index >= 0) {
    notifications[index].show = false;
    update({ notifications });
  }
};

// ==============================================================
on(ACTION.addNotification, addNotificationRecipe);
on(ACTION.hideNotification, hideNotificationRecipe);
