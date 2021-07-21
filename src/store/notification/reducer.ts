import { ACTION } from '../action-types';
import { AddNotificationPayload } from './types';
import { useNotification } from './index';

const { on } = window.electron;

// ==============================================================
export const addNotificationRecipe = (_: null, { notification }: AddNotificationPayload) => {
  const { update, notifications } = useNotification.getState();

  update({
    notifications: [...notifications, notification]
  });
};

export const resetNotificationsRecipe = (_: null) => {
  const { update } = useNotification.getState();

  update({ notifications: [] });
};

// ==============================================================
on(ACTION.addNotification, addNotificationRecipe);
on(ACTION.resetNotifications, resetNotificationsRecipe);
