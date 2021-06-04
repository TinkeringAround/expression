import { AudioType } from './types';

/**
 * Removes audio type from audio name
 * @param {string} audioName the audio name with audio type
 * @returns {string} the audio name without audio type ending
 */
export const removeAudioFileTypeFromName: (audioName: string) => string = audioName => {
  if (audioName.includes('.wav')) return audioName.replace('.wav', '');
  if (audioName.includes('.mp3')) return audioName.replace('.mp3', '');
  return audioName;
};

/**
 * Translates audio type of 'audio/wav' or 'audio/mp3' to AudioType
 * @param {string} audioType the combined audioType of a file
 * @returns {AudioType | null} the typed audio type
 */
export const getAudioType: (audioType: string) => AudioType | null = audioType => {
  if (audioType.includes('wav')) return 'wav';
  if (audioType.includes('mp3')) return 'mp3';
  return null;
};

/**
 * Check an file type to be an audio
 * @param {string} fileType the the file type
 * @returns {boolean}
 */
export const isAudio = (fileType: string): boolean => fileType.includes('audio');

/**
 * Samples the AudioBuffer retrieved from an external source
 * @param {AudioBuffer} rawData the AudioBuffer from drawAudio()
 * @param {number} samples the count of samples in the final output
 * @returns {Array} an array of floating point numbers
 */
export const sampleChannelData = (rawData: Float32Array, samples: number): number[] => {
  if (rawData.length < samples) {
    return Array.from(rawData);
  }

  // the number of samples in each subdivision
  const blockSize = Math.floor(rawData.length / samples);

  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    // the location of the first sample in the block
    let blockStart = blockSize * i;

    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      // find the sum of all the samples in the block
      sum = sum + rawData[blockStart + j]; //Math.abs(rawData[blockStart + j]);
    }

    // divide the sum by the block size to get the average
    filteredData.push(sum / blockSize);
  }

  return filteredData;
};

/**
 * Calculate wav to mp3 compression (relation wav to mp3 is 10.75:1)
 * @param {number} wavSize file size
 * @returns {number} estimated mp3 compressed size
 */
export const convertWavToMp3Size = (wavSize: number): number => Math.floor(wavSize / 10.75);

/**
 * Find the absolute maximum value of a number array
 * @param {number[]} values the numbers array with negative and/or positive values
 * @returns {number} the absolute maximum value
 */
export const findAbsoluteMax = (values: number[]): number =>
  Math.max.apply(null, values.map(Math.abs));
