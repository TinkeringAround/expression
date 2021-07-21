import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useNotification } from '../../../store/notification';
import { resetNotificationsRecipe } from '../../../store/notification/reducer';

import Notifications from './index';

import { getNotificationMock, getNotificationStoreMock } from '../../../mock/store';
import { AppMock } from '../../../mock/components';
import { mockElectronTrigger } from '../../../mock/electron';

describe('Notifications', () => {
  const notification = getNotificationMock();

  const NotificationsInApp = (
    <AppMock>
      <Notifications />
    </AppMock>
  );

  beforeEach(() => {
    useNotification.setState(getNotificationStoreMock({ notifications: [notification] }));
  });

  test('should render notifications', () => {
    render(NotificationsInApp);

    expect(screen.getAllByRole('notification').length).toEqual(
      useNotification.getState().notifications.length
    );
    expect(screen.getByText(notification.content)).toBeInTheDocument();
  });

  test('should clear notifications when click on trash icon', async () => {
    mockElectronTrigger(resetNotificationsRecipe);
    render(NotificationsInApp);

    const crossIcon = document.querySelector('.icon-trash');
    expect(crossIcon).toBeInTheDocument();

    if (crossIcon) {
      fireEvent.click(crossIcon);

      await waitFor(() => expect(useNotification.getState().notifications.length).toBe(0));
    }
  });
});
