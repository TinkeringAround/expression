import { useNotification } from './index';
import { addNotificationRecipe, hideNotificationRecipe } from './reducer';

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

  describe('hideNotificationRecipe', () => {
    const notification = getNotificationMock();

    beforeEach(() => {
      useNotification.setState(getNotificationStoreMock());
    });

    test('should hide notification when notification exists', () => {
      hideNotificationRecipe(null, { notification });

      expect(useNotification.getState().notifications[0].show).toBeFalsy();
    });

    test('should not hide notification when notification does not exists', () => {
      hideNotificationRecipe(null, { notification: { ...notification, content: 'NOT EXISTING' } });

      expect(useNotification.getState().notifications[0].show).toBeTruthy();
    });
  });
});
