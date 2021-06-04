import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useNotification } from '../../store/notification';
import { selectNotificationsToShow } from '../../store/notification/selector';

import Notifications from './index';

import { getNotificationMock, getNotificationStoreMock } from '../../mock/store';
import { AppMock } from '../../mock/components';
import { mockElectronTrigger } from '../../mock/electron';
import { hideNotificationRecipe } from '../../store/notification/reducer';

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
      selectNotificationsToShow(useNotification.getState()).length
    );
    expect(screen.getByText(notification.content)).toBeInTheDocument();
  });

  test('should hide notification when click on cross icon', async () => {
    mockElectronTrigger(hideNotificationRecipe);
    render(NotificationsInApp);

    const crossIcon = document.querySelector('.icon-cross');
    expect(crossIcon).toBeInTheDocument();

    if (crossIcon) {
      fireEvent.click(crossIcon);

      await waitFor(() => expect(useNotification.getState().notifications[0].show).toBeFalsy());
    }
  });
});
