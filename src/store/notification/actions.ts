import { ACTION } from '../action-types';
import { Notification } from './types';

const { trigger } = window.electron;

export const addNotification = (notification: Notification) =>
  trigger(ACTION.addNotification, { notification });

export const resetNotifications = () => trigger(ACTION.resetNotifications);
