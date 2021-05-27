import { ToneAudioBuffer } from 'tone';
import { mock } from 'jest-mock-extended';

import { AudioFile, SlicerAudioFile } from '../store/types';

import { getChannelDataMock } from './audio';

export const getFileMock = (name: string = 'test2.wav', type: string = 'audio/wav'): File =>
  new File(['TestTestTest'], name, {
    type
  });

export const getAudioFileMock = ({
  name = 'angular.wav',
  type = 'audio/wav',
  path = 'audioPath',
  size = 1000
}: Partial<AudioFile>): AudioFile & { size: number } => ({
  name,
  type,
  path,
  size
});

export const getSlicerAudioFileMock = ({
  name = 'angular.wav',
  type = 'audio/wav',
  path = 'audioPath',
  size = 1000,
  samples = 100,
  duration = 1000
}: Partial<SlicerAudioFile> & {
  samples?: number;
  duration?: number;
}): SlicerAudioFile => {
  const buffer = mock<ToneAudioBuffer>();

  Object.defineProperty(buffer, 'duration', {
    get: () => duration,
    set: () => {}
  });

  return {
    ...getAudioFileMock({ name, type, path, size }),
    channelData: [getChannelDataMock(samples), getChannelDataMock(samples)],
    buffer
  };
};
