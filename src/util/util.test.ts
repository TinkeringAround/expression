import { bytesToMegaBytes, getElectron } from '.';

describe('Utils', () => {
  test('formatBytes', () => {
    const fileSizes = [3426256, 16338736, 9282076];
    const expectedMegaBytes = ['3.27 MB', '15.58 MB', '8.85 MB'];

    fileSizes.forEach((fileSize, index) => {
      expect(bytesToMegaBytes(fileSize)).toEqual(expectedMegaBytes[index]);
    });
  });

  test('getElectron', () => {
    const { trigger, dispatch, on, isDev } = getElectron();

    expect(dispatch).not.toBeNull();
    expect(trigger).not.toBeNull();
    expect(on).not.toBeNull();
    expect(isDev).toBeTruthy();
  });
});
