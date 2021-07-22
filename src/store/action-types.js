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

  addNotification: '[NOTIFICATION] Add Notification',
  resetNotifications: '[NOTIFICATION] Reset Notifications'
});

module.exports = {
  ACTION
};
