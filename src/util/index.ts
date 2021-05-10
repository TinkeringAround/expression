import { Features } from '../features';

export const bytesToMegaBytes: (bytes: number) => string = bytes =>
  `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

export const getFeatureNameByPath: (path: string) => string = path => {
  if (path === '/') return '';
  if (path === Features.DASHBOARD) return 'Kadenz';
  return `${path[1].toUpperCase()}${path.slice(2)}`;
};
