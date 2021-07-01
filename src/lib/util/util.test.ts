import { Features } from '../../features';
import { toMB, featureToNameByPath, map, asSeconds } from './index';

describe('Utils', () => {
  test('toMB', () => {
    const fileSizes = [3426256, 16338736, 9282076];
    const expectedMegaBytes = ['3.27 MB', '15.58 MB', '8.85 MB'];

    fileSizes.forEach((fileSize, index) => {
      expect(toMB(fileSize)).toEqual(expectedMegaBytes[index]);
    });
  });

  describe('asSeconds', () => {
    test('with explicit fraction', () => {
      const durations = [1.11, 1.11, 1.66, 1.66, 1.66, 1.01];
      const fractions = [0, 1, 1, 0, 2, 1];
      const expectedSeconds = ['1s', '1.1s', '1.7s', '2s', '1.66s', '1s'];

      durations.forEach((duration, index) => {
        expect(asSeconds(duration, fractions[index])).toEqual(expectedSeconds[index]);
      });
    });

    test('without explicit fraction', () => {
      const durations = [1.11, 1.66];
      const expectedSeconds = ['1s', '2s'];

      durations.forEach((duration, index) => {
        expect(asSeconds(duration)).toEqual(expectedSeconds[index]);
      });
    });
  });

  test('featureToNameByPath', () => {
    const features = ['/', Features.DASHBOARD, Features.SLICER, Features.FX, Features.PHRASER];
    const expectedNames = ['', 'Kadenz', 'S', 'F', 'P'];

    features.forEach((feature, index) =>
      expect(featureToNameByPath(feature)).toEqual(expectedNames[index])
    );
  });

  test('map', () => {
    const values = [0, 5, 10];
    const expectedValues = [0, 50, 100];

    values.forEach((value, index) => expect(map(value, 0, 10, 0, 100)).toBe(expectedValues[index]));
  });
});
