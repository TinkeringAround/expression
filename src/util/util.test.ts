import { Features } from '../features';
import { bytesToMegaBytes, getFeatureNameByPath, mapValues } from '.';

describe('Utils', () => {
  test('bytesToMegaBytes', () => {
    const fileSizes = [3426256, 16338736, 9282076];
    const expectedMegaBytes = ['3.27 MB', '15.58 MB', '8.85 MB'];

    fileSizes.forEach((fileSize, index) => {
      expect(bytesToMegaBytes(fileSize)).toEqual(expectedMegaBytes[index]);
    });
  });

  test('getFeatureNameByPath', () => {
    const features = ['/', Features.DASHBOARD, Features.SLICER, Features.FX, Features.PHRASER];
    const expectedNames = ['', 'Kadenz', 'Slicer', 'Fx', 'Phraser'];

    features.forEach((feature, index) =>
      expect(getFeatureNameByPath(feature)).toEqual(expectedNames[index])
    );
  });

  test('mapValues', () => {
    const values = [0, 5, 10];
    const expectedValues = [0, 50, 100];

    values.forEach((value, index) =>
      expect(mapValues(value, 0, 10, 0, 100)).toBe(expectedValues[index])
    );
  });
});
