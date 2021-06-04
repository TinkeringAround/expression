import { NotificationState } from './index';

export const selectNotificationsToShow = (state: NotificationState) =>
  state.notifications.filter(notification => notification.show);
