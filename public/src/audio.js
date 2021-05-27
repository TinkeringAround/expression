const { ipcMain } = require('electron');
const fs = require('fs');
const wav = require('node-wav');

// ==============================================================
const { isDev } = require('./consts');
const { ACTION } = require(isDev ? '../../src/store/action-types' : './action-types');
const { logError, logInfo } = require('./logger');

// ==============================================================
function loadAudioFile(event, { file }) {
  try {
    logInfo(`${ACTION.loadSlicerFile} in path ${file.path}`);

    if (fs.existsSync(file.path)) {
      const buffer = fs.readFileSync(file.path);
      const { channelData } = wav.decode(buffer);
      event.reply(ACTION.slicerFileLoaded, {
        file,
        channelData
      });
    } else {
      logInfo(`${ACTION.loadSlicerFile}, no audio file found`);
      event.reply(ACTION.slicerFileLoaded, {
        file,
        error: 'No Audio file found.',
        channelData: [[], []]
      });
    }
  } catch (error) {
    const errorMsg = `${ACTION.loadSlicerFile}, raising ${error}`;
    logError(errorMsg);
    event.reply(ACTION.slicerFileLoaded, { file, error: errorMsg, channelData: [[], []] });
  }
}

// ==============================================================
try {
  ipcMain.on(ACTION.loadSlicerFile, loadAudioFile);
} catch (error) {
  logError(error);
}
