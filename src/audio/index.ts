import { AudioType } from './types';

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
 * Check an file type to be an audip
 * @param {string} fileType the the file type
 * @returns {boolean}
 */
export const isAudio: (fileType: string) => boolean = fileType => fileType.includes('audio');

/**
 * Filters the AudioBuffer retrieved from an external source
 * @param {AudioBuffer} rawData the AudioBuffer from drawAudio()
 * @param {number} samples the count of samples in the final output
 * @returns {Array} an array of floating point numbers
 */
const filterData = (rawData: Float32Array, samples: number) => {
  // the number of samples in each subdivision
  const blockSize = Math.floor(rawData.length / samples);

  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    // the location of the first sample in the block
    let blockStart = blockSize * i;

    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      // find the sum of all the samples in the block
      sum = sum + Math.abs(rawData[blockStart + j]);
    }

    // divide the sum by the block size to get the average
    filteredData.push(sum / blockSize);
  }

  return filteredData;
};

/**
 * Normalizes the audio data to make a cleaner illustration
 * @returns {Array} an normalized array of floating point numbers
 */
export const normalizeData = (audioBuffer: Float32Array, samples: number = 70) => {
  const filteredData = filterData(audioBuffer, samples);
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map(n => n * multiplier);
};
