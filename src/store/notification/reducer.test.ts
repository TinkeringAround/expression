import { useNotification } from './index';
import { addNotificationRecipe, resetNotificationsRecipe } from './reducer';

import { getNotificationMock, getNotificationStoreMock } from '../../mock/store';

describe('notifications reducer', () => {
  describe('addNotificationRecipe', () => {
    const notification = getNotificationMock();

    beforeEach(() => {
      useNotification.setState(getNotificationStoreMock({ notifications: [] }));
    });

    test('should add notification', () => {
      addNotificationRecipe(null, { notification });

      expect(useNotification.getState().notifications.length).toBe(1);
      expect(useNotification.getState().notifications.includes(notification)).toBeTruthy();
    });
  });

  describe('resetNotifications', () => {
    beforeEach(() => {
      useNotification.setState(getNotificationStoreMock());
    });

    test('should reset notifications', () => {
      expect(useNotification.getState().notifications.length).toBeGreaterThan(0);

      resetNotificationsRecipe(null);

      expect(useNotification.getState().notifications.length).toBe(0);
    });
  });
});
