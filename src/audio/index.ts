// expected input 'audio/wav' or 'audio/mp3'
import { AudioType } from './types';

export const getAudioType: (audioType: string) => AudioType | null = audioType => {
  if (audioType.includes('wav')) return 'wav';
  if (audioType.includes('mp3')) return 'mp3';
  return null;
};

export const isAudio: (fileType: string) => boolean = fileType => fileType.includes('audio');
