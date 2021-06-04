/**
 * Create a mock of audio channel data with random values
 * @param {number} count the length of random generated array
 * @returns {Float32Array} an array of floating point numbers
 */
export const getChannelDataMock = (count: number): Float32Array =>
  Float32Array.from(Array.from({ length: count }, () => Math.random() * 10));
