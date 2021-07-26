const ACTION = Object.freeze({
  updateRoute: '[ROUTE] Update',

  configLoaded: '[CONFIG] Loaded',
  loadConfig: '[CONFIG] Load',
  updateConfig: '[CONFIG] Update',

  addSlicerFiles: '[SLICER] Add Files',
  removeSlicerFile: '[SLICER] Remove File',
  loadSlicerFile: '[SLICER] Load File',
  slicerFileLoaded: '[SLICER] File Loaded',
  updateSlicerSelection: '[SLICER] Update Slicer Selection',
  exportSlicerFile: '[SLICER] Export Slicer File',
  updateSlicerIsPlaying: '[SLICER] Update Slicer IsPlaying',
  updateSlicerProgression: '[SLICER] Update Slicer Progression',
  slicerFileExported: '[SLICER] Slicer File Exported',
  slicerFileExportCancelled: '[SLICER] Slicer File Export Cancelled',

  addPhraserCollection: '[PHRASER] Add Music Collection',
  reorderPhraserCollection: '[PHRASER] Reorder Collection',
  deletePhraserCollection: '[PHRASER] Delete Music Collection',
  updatePhraserCollectionTitle: '[PHRASER] Update Music Collection Title',
  reorderPhraserCollectionSongs: '[PHRASER] Update Music Collection Songs',
  movePhraserCollectionSong: '[PHRASER] Move Music Collection Song',
  addPhraserCollectionSong: '[PHRASER] Add Music Collection Song',
  selectPhraserSong: '[PHRASER] Select Song',
  deletePhraserSong: '[PHRASER] Delete Song',

  addNotification: '[NOTIFICATION] Add Notification',
  resetNotifications: '[NOTIFICATION] Reset Notifications'
});

module.exports = {
  ACTION
};
