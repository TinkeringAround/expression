const { ipcMain } = require('electron');
const fs = require('fs');

// ==============================================================
const { isDev, PHRASER_PATH } = require('./consts');
const { ACTION } = require(isDev ? '../../src/store/action-types' : './action-types');
const { logError, logInfo } = require('./logger');

// ==============================================================
function loadPhraser(event) {
  try {
    logInfo(`${ACTION.loadPhraser} in path ${PHRASER_PATH}`);

    if (fs.existsSync(PHRASER_PATH)) {
      const phraserRaw = fs.readFileSync(PHRASER_PATH);
      const phraser = JSON.parse(phraserRaw);
      event.reply(ACTION.phraserLoaded, { phraser });
    } else {
      logInfo(`${ACTION.phraserLoaded}, no phraser file found`);
      event.reply(ACTION.phraserLoaded, { phraser: {} });
    }
  } catch (error) {
    const errorMsg = `${ACTION.phraserLoaded}, raising ${error}`;
    logError(errorMsg);
    event.reply(ACTION.phraserLoaded, { phraser: {}, error: errorMsg });
  }
}

function updatePhraser(event, { phraser }) {
  try {
    logInfo(`${ACTION.updatePhraser} in path ${PHRASER_PATH}`);

    if (fs.existsSync(PHRASER_PATH)) fs.unlinkSync(PHRASER_PATH);

    const jsonPhraser = JSON.stringify(phraser);
    fs.writeFileSync(PHRASER_PATH, jsonPhraser);
  } catch (error) {
    const errorMsg = `${ACTION.updatePhraser}, raising ${error}`;
    logError(errorMsg);
  }
}

// ==============================================================
try {
  ipcMain.on(ACTION.loadPhraser, loadPhraser);
  ipcMain.on(ACTION.updatePhraser, updatePhraser);
} catch (error) {
  logError(error);
}
