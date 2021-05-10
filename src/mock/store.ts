import { AppState, useStore } from '../store';

export const getMockStore: (statePartial?: Partial<AppState>) => AppState = (statePartial = {}) => {
  const { update } = useStore.getState();

  return {
    slicer: {
      files: [
        {
          name: 'react.wav',
          size: 100000,
          type: 'audio/wav',
          path: 'reactPath'
        },
        {
          name: 'angular.wav',
          size: 50000,
          type: 'audio/wav',
          path: 'angularPath'
        }
      ],
      selectedFile: {
        name: 'angular.wav',
        size: 50000,
        type: 'audio/wav',
        path: 'angularPath'
      }
    },
    ...statePartial,
    update
  } as AppState;
};
