const path = require('path');

// ==============================================================
const isDev = process.env['ENV'] === 'development';
const DATA_PATH = process.env['DATA_PATH'];
const LOG_PATH = path.join(DATA_PATH, 'log.txt');
const CONFIG_PATH = path.join(DATA_PATH, 'config.json');
const isMac = process.platform === 'darwin';
const MAX_LOG_FILE_SIZE = 5;

// ==============================================================
module.exports = {
  isDev,
  isMac,
  LOG_PATH,
  MAX_LOG_FILE_SIZE,
  CONFIG_PATH
};
