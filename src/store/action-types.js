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

  addNotification: '[NOTIFICATION] Add Notification',
  hideNotification: '[NOTIFICATION] Hide Notification'
});

module.exports = {
  ACTION
};
