import { NotificationState, useNotification } from '../store/notification';
import { Notification } from '../store/notification/types';

export const getNotificationMock = (notificationPartial?: Partial<Notification>): Notification => ({
  type: notificationPartial?.type ?? 'info',
  content: notificationPartial?.content ?? 'Content'
});
export const getNotificationStoreMock = (
  statePartial?: Partial<NotificationState>
): NotificationState => {
  const { update } = useNotification.getState();

  return {
    notifications: [getNotificationMock()],
    ...statePartial,
    update
  } as NotificationState;
};
