export enum Features {
  DASHBOARD = '/dashboard',
  SLICER = '/slicer',
  PHRASER = '/phraser',
  FX = '/fx'
}

export const FeatureDescription: { [feature: string]: string } = {
  SLICER: 'Listen to Audio Files, Crop them to Slices and Export them easily.',
  PHRASER:
    'Write unique Songtexts using Phraser Rhyme Helper, Dictionary, Snippet Management and more.',
  FX: 'Coming soon...'
};
