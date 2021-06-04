import React, { FC } from 'react';

import { useNotification } from '../../store/notification';
import { selectNotificationsToShow } from '../../store/notification/selector';
import { hideNotification } from '../../store/notification/actions';

import Icon from '../icon';

import { SNotification, SNotifications } from './styled';

const Notifications: FC = () => {
  const notifications = useNotification(selectNotificationsToShow);

  return (
    <SNotifications>
      {notifications.map((notification, index) => (
        <SNotification
          key={`notification-${index}`}
          role="notification"
          style={{
            // @ts-ignore
            '--index': index + 1
          }}
        >
          <Icon iconType="cross" onClick={() => hideNotification(notification)} />
          <Icon iconType={notification.type} />
          <p>{notification.content}</p>
        </SNotification>
      ))}
    </SNotifications>
  );
};

export default Notifications;
