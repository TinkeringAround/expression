export type NotificationType = 'info' | 'error';

export type Notification = {
  content: string;
  type: NotificationType;
};

export type AddNotificationPayload = {
  notification: Notification;
};

export interface UpdateSlicerIsPlayingPayload {
  isPlaying: boolean;
}
