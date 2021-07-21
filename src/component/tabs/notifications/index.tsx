import React, { FC } from 'react';

import { useNotification } from '../../../store/notification';
import { resetNotifications } from '../../../store/notification/actions';

import Icon from '../../icon';
import For from '../../for';

import { SNotification, SNotifications } from './styled';
import If from '../../if';

const Notifications: FC = () => {
  const { notifications } = useNotification();

  return (
    <SNotifications>
      <h1>Notifications</h1>
      <Icon iconType="trash" onClick={() => resetNotifications()} />
      <div>
        <If condition={notifications.length === 0}>
          <p>No Notifications yet...</p>
        </If>
        <For
          values={notifications}
          projector={(notification, index) => (
            <SNotification
              key={`notification-${index}`}
              role="notification"
              style={{
                // @ts-ignore
                '--index': index + 1
              }}
            >
              <Icon iconType={notification.type} />
              <p>{notification.content}</p>
            </SNotification>
          )}
        />
      </div>
    </SNotifications>
  );
};

export default Notifications;
