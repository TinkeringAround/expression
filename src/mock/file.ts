import { AudioFile } from '../store/types';

export const getFileMock: (name?: string, type?: string) => File = (
  name = 'test2.wav',
  type = 'audio/wav'
) =>
  new File(['TestTestTest'], name, {
    type
  });

export const getAudioFileMock: () => AudioFile = () => ({
  name: 'Test.wav',
  type: 'audio/wav',
  path: 'path/to/file',
  size: 1000,
  audio: {
    channelData: [
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0]
    ],
    sampleRate: 1
  }
});
