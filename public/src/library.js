const spell = require('nspell');
const en = require('dictionary-en');
const de = require('dictionary-de');
const { ipcMain } = require('electron');

// ==============================================================
const { isDev } = require('./consts');
const { logError, logInfo } = require('./logger');
const { ACTION } = require(isDev ? '../../src/store/action-types' : './action-types');

// ==============================================================
const dictionaries = [];
let library;

// ==============================================================
// load dictionaries
en(registerDictionary);
de(registerDictionary);

// ==============================================================
function registerDictionary(err, dict) {
  if (err) {
    throw err;
  }

  dictionaries.push(dict);
}

function getSuggestion(event, { word }) {
  try {
    logInfo(`${ACTION.getSuggestion}`);

    // register dictionaries in library
    if (!library && dictionaries.length > 0) {
      library = spell(dictionaries);
    }

    const suggestions = spell(dictionaries[1]).suggest(word);
    logInfo(word);
    suggestions.forEach(value => logInfo(value));
    event.reply(ACTION.addSuggestion, { word, suggestions });
  } catch (error) {
    const errorMsg = `${ACTION.getSuggestion}, raising ${error}`;
    logError(errorMsg);
  }
}

// ==============================================================
try {
  ipcMain.on(ACTION.getSuggestion, getSuggestion);
} catch (error) {
  logError(error);
}
