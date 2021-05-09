export const bytesToMegaBytes: (bytes: number) => string = bytes =>
  `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

export const featurePathToName: (feature: string) => string = feature =>
  `${feature[1].toUpperCase()}${feature.slice(2)}`;
