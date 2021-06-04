export type NotificationType = 'info' | 'error';

export type Notification = {
  content: string;
  type: NotificationType;
  show: boolean;
};

export type AddNotificationPayload = {
  notification: Notification;
};

export type HideNotificationPayload = AddNotificationPayload;
