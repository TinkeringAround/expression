const ACTION = Object.freeze({
  updateRoute: '[ROUTE] Update',

  configLoaded: '[CONFIG] Loaded',
  loadConfig: '[CONFIG] Load',
  updateConfig: '[CONFIG] Update'
});

const STATUS = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  RUNNING: 'running',
  INACTIVE: 'inactive'
});

module.exports = {
  ACTION,
  STATUS
};
