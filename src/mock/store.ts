import { AppState, useStore } from '../store';
import { SlicerSelection } from '../store/types';
import { getAudioFileMock, getSlicerAudioFileMock } from './types';

export const getMockSelection = ({
  start = 0,
  end = 0,
  zoom = 1,
  offset = 0
}): Partial<SlicerSelection> => ({
  start,
  end,
  zoom,
  offset
});

export const getMockStore: (statePartial?: Partial<AppState>) => AppState = (statePartial = {}) => {
  const { update } = useStore.getState();

  return {
    slicer: {
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
      selection: getMockSelection({})
    },
    ...statePartial,
    update
  } as AppState;
};
