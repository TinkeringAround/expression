import { useNotification } from './index';
import { selectNotificationsToShow } from './selector';

import { getNotificationMock, getNotificationStoreMock } from '../../mock/store';

describe('notification selector', () => {
  const visibleNotification = getNotificationMock({ show: true });
  const hiddenNotification = getNotificationMock({ show: false });

  beforeEach(() => {
    useNotification.setState(
      getNotificationStoreMock({ notifications: [visibleNotification, hiddenNotification] })
    );
  });

  test('selectNotificationsToShow', () => {
    const notifications = selectNotificationsToShow(useNotification.getState());

    expect(notifications.includes(visibleNotification)).toBeTruthy();
    expect(notifications.includes(hiddenNotification)).toBeFalsy();
  });
});
