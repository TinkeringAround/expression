import { toDate } from './index';

describe('toDate', () => {
  test('should return date when valid timestamp is provided', () => {
    expect(toDate(1)).toBe('01. Jan 1970');
    expect(toDate(1629983634706)).toBe('26. Aug 2021');
  });
});
