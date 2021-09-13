import React, { FC } from 'react';

import { useNotification } from '../../../store/notification';
import { resetNotifications } from '../../../store/notification/actions';

import Icon from '../../icon';
import For from '../../for';
import If from '../../if';

import { SNotification, SNotifications } from './styled';

const Notifications: FC = () => {
  const { notifications } = useNotification();

  return (
    <SNotifications>
      <h1>Notifications</h1>
      <div className="controls">
        <button title="Clear Notifications" onClick={resetNotifications}>
          <Icon iconType="trash" />
        </button>
      </div>
      <If condition={notifications.length === 0}>
        <p>No Notifications yet...</p>
      </If>
      <div className="content">
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
              <span className="message">{notification.content}</span>
            </SNotification>
          )}
        />
      </div>
    </SNotifications>
  );
};

export default Notifications;
