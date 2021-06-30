import {
  convertWavToMp3Size,
  findAbsoluteMax,
  getAudioType,
  isAudio,
  removeAudioFileTypeFromName,
  sampleChannelData
} from './index';

import { getChannelDataMock } from '../../mock/audio';

describe('audio', () => {
  describe('removeAudioFileTypeFromName', () => {
    test('should remove audio type from audio file name', () => {
      const audioTypeInputs = ['waveFile.wav', 'mpegFile.mp3', 'test.png'];
      const expectedAudioTypes = ['waveFile', 'mpegFile', 'test.png'];

      audioTypeInputs.forEach((audioTypeInput, index) => {
        expect(removeAudioFileTypeFromName(audioTypeInput)).toEqual(expectedAudioTypes[index]);
      });
    });
  });

  describe('getAudioType', () => {
    test('should return correct AudioType', () => {
      const audioTypeInputs = ['audio/wav', 'audio/mp3'];
      const expectedAudioTypes = ['wav', 'mp3'];

      audioTypeInputs.forEach((audioTypeInput, index) => {
        expect(getAudioType(audioTypeInput)).toEqual(expectedAudioTypes[index]);
      });
    });

    test('should return null on invalid audio', () => {
      expect(getAudioType('invalid/invalid')).toBeNull();
    });
  });

  describe('isAudio', () => {
    test('should return correct values', () => {
      const audioTypeInputs = ['audio/wav', 'audio/mp3', 'image/png'];
      const expectedAudioTypes = [true, true, false];

      audioTypeInputs.forEach((audioTypeInput, index) => {
        expect(isAudio(audioTypeInput)).toBe(expectedAudioTypes[index]);
      });
    });
  });

  describe('sampleAudioData', () => {
    test('should sample audio data', () => {
      const samples = 50;
      const audioFile = getChannelDataMock(1000);
      const sampledData = sampleChannelData(audioFile, samples);

      expect(sampledData.length).toEqual(samples);
    });

    test('should not sample audio data when samples are greater than data length', () => {
      const samples = 20,
        channelDataLength = 10;
      const audioFile = getChannelDataMock(channelDataLength);
      const sampledData = sampleChannelData(audioFile, samples);

      expect(sampledData.length).toBe(channelDataLength);
    });
  });

  describe('convertWavToMp3Size', () => {
    test('should convert with relation 10.75:1', () => {
      const wavFileSize = 1002346;
      const estimatedMp3FileSize = 93241;

      expect(convertWavToMp3Size(wavFileSize)).toEqual(estimatedMp3FileSize);
    });
  });

  describe('findAbsoluteMax', () => {
    test('should find absolute maximum', () => {
      const values = [
        [-1, 1, 0, 2],
        [-2, 1, 0],
        [0, 0, 0]
      ];
      const expectedMax = [2, 2, 0];

      values.forEach((value, index) => {
        expect(findAbsoluteMax(value)).toEqual(expectedMax[index]);
      });
    });
  });
});
