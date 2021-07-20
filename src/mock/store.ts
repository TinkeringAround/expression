import { SlicerSelection } from '../store/slicer/types';
import { getAudioFileMock, getSlicerAudioFileMock } from './types';
import { SlicerState, useSlicer } from '../store/slicer';
import { NotificationState, useNotification } from '../store/notification';
import { Notification } from '../store/notification/types';

export const getMockSelection = ({
  start = 0,
  end = 0,
  zoom = 1,
  offset = 0
}): SlicerSelection => ({
  start,
  end,
  zoom,
  offset
});

export const getSlicerStoreMock: (statePartial?: Partial<SlicerState>) => SlicerState = (
  statePartial = {}
) => {
  const { update } = useSlicer.getState();

  return {
    files: [
      getAudioFileMock({ name: 'react.wav', size: 100000, type: 'audio/wav', path: 'reactPath' }),
      getAudioFileMock({
        name: 'angular.wav',
        size: 50000,
        type: 'audio/wav',
        path: 'angularPath'
      })
    ],
    file: getSlicerAudioFileMock({}),
    selection: getMockSelection({}),
    progress: 0,
    isExporting: false,
    samples: 100,
    ...statePartial,
    update
  } as SlicerState;
};

export const getNotificationMock = (notificationPartial?: Partial<Notification>): Notification => ({
  type: notificationPartial?.type ?? 'info',
  content: notificationPartial?.content ?? 'Content'
});

export const getNotificationStoreMock = (
  statePartial?: Partial<NotificationState>
): NotificationState => {
  const { update } = useNotification.getState();

  return {
    notifications: [getNotificationMock()],
    ...statePartial,
    update
  } as NotificationState;
};
