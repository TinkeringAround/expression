import create, { State } from 'zustand';

import { Notification } from './types';

export interface NotificationState extends State {
  notifications: Notification[];
  readonly update: (partial: Partial<NotificationState>) => void;
}

export const useNotification = create<NotificationState>(set => ({
  notifications: [],
  //@ts-ignore
  update: (partial: Partial<NotificationState>) => set(partial)
}));
