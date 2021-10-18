const spell = require('nspell');
const en = require('dictionary-en');
const de = require('dictionary-de');
const fr = require('dictionary-fr');
const { ipcMain } = require('electron');

// ==============================================================
const { isDev } = require('./consts');
const { logError, logInfo } = require('./logger');
const { ACTION } = require(isDev ? '../../src/store/action-types' : './action-types');

// ==============================================================
const dictionaries = {
  en: undefined,
  de: undefined,
  fr: undefined
};

// ==============================================================
// load dictionaries
en((err, dict) => registerDictionary(err, dict, 'en'));
de((err, dict) => registerDictionary(err, dict, 'de'));
fr((err, dict) => registerDictionary(err, dict, 'fr'));

// ==============================================================
function registerDictionary(err, dict, lang) {
  if (err) {
    throw err;
  }

  dictionaries[lang] = dict;
}

function getSuggestion(event, { word }) {
  try {
    logInfo(`${ACTION.getSuggestion}`);
    const dictionaryLoaded = Object.values(dictionaries).every(dict => !dict);
    const suggestions = {
      en: [],
      de: [],
      fr: []
    };

    if (dictionaryLoaded) {
      const errorMsg = `${ACTION.getSuggestion}, raising "Not all Dictionaries registered yet"`;
      logError(errorMsg);
    }

    Object.keys(dictionaries).forEach(lang => {
      if (dictionaries[lang]) {
        suggestions[lang] = spell(dictionaries[lang]).suggest(word);
      }
    });

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
