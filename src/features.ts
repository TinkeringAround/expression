export enum Features {
  DASHBOARD = '/dashboard',
  SLICER = '/slicer',
  PHRASER = '/phraser',
  FX = '/fx'
}

export const FeatureDescription: { [feature: string]: string } = {
  SLICER: 'Listen to Audio Files, Crop them to Slices and Export them easily.',
  PHRASER: 'Coming soon...',
  FX: 'Coming soon...'
};
