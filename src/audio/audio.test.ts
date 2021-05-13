import { getAudioType, isAudio } from './index';

describe('audio', () => {
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
});
