const { app } = require('electron');

// ==============================================================
// set process envs, then load them to consts
// has to be executed first before importing all other modules
process.env['ENV'] = require('electron-is-dev') ? 'development' : 'production';
process.env['DATA_PATH'] = `${app.getPath('userData')}`;
require('./src/consts');
require('./src/audio');

// ==============================================================
const { logError } = require('./src/logger');
const { createWindow } = require('./src/window');
require('./src/config');
require('./src/menu');

// ==============================================================
process.on('uncaughtException', error => logError(`Main process: Uncaught Exception: ${error}`));

// ==============================================================
try {
  app.on('ready', createWindow);
  app.on('activate', createWindow);
  app.on('window-all-closed', () => app.quit());
} catch (error) {
  logError(error);
}
