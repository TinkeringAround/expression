const { ipcMain } = require('electron');
const fs = require('fs');

// ==============================================================
const { isDev, SNIPPETS_PATH } = require('./consts');
const { ACTION } = require(isDev ? '../../src/store/action-types' : './action-types');
const { logError, logInfo } = require('./logger');

// ==============================================================
function loadSnippets(event) {
  try {
    logInfo(`${ACTION.loadSnippets} in path ${SNIPPETS_PATH}`);

    if (fs.existsSync(SNIPPETS_PATH)) {
      const snippetsRaw = fs.readFileSync(SNIPPETS_PATH);
      const snippets = JSON.parse(snippetsRaw);
      event.reply(ACTION.snippetsLoaded, { snippets });
    } else {
      logInfo(`${ACTION.snippetsLoaded}, no snippets file found`);
      event.reply(ACTION.snippetsLoaded, { snippets: {} });
    }
  } catch (error) {
    const errorMsg = `${ACTION.snippetsLoaded}, raising ${error}`;
    logError(errorMsg);
    event.reply(ACTION.snippetsLoaded, { snippets: {}, error: errorMsg });
  }
}

function updateSnippets(event, { snippets }) {
  try {
    logInfo(`${ACTION.updateSnippets} in path ${SNIPPETS_PATH}`);

    if (fs.existsSync(SNIPPETS_PATH)) fs.unlinkSync(SNIPPETS_PATH);

    const jsonSnippets = JSON.stringify(snippets);
    fs.writeFileSync(SNIPPETS_PATH, jsonSnippets);
  } catch (error) {
    const errorMsg = `${ACTION.updateSnippets}, raising ${error}`;
    logError(errorMsg);
  }
}

// ==============================================================
try {
  ipcMain.on(ACTION.loadSnippets, loadSnippets);
  ipcMain.on(ACTION.updateSnippets, updateSnippets);
} catch (error) {
  logError(error);
}
