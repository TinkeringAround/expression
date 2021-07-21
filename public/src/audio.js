const { ipcMain, dialog } = require('electron');
const fs = require('fs');
const wav = require('node-wav');

// ==============================================================
const { isDev } = require('./consts');
const { ACTION } = require(isDev ? '../../src/store/action-types' : './action-types');
const { logError, logInfo } = require('./logger');
const { decode } = require('./decoder');

// ==============================================================
async function loadAudioFile(event, { file, audioType }) {
  const EMPTY = [[], []];

  try {
    logInfo(`${ACTION.loadSlicerFile} in path ${file.path}`);

    if (fs.existsSync(file.path)) {
      const channelData = await decode(file.path, audioType);
      event.reply(ACTION.updateSlicerProgression, { progress: 100 });

      if (channelData) {
        event.reply(ACTION.slicerFileLoaded, { file, channelData });
      } else {
        const errorMsg = `${ACTION.loadSlicerFile}, raising "Incompatible File Type" error`;
        logError(errorMsg);

        event.reply(ACTION.slicerFileLoaded, {
          file,
          error: 'This file type is not supported as it is right now.',
          channelData: EMPTY
        });
      }
    } else {
      logInfo(`${ACTION.loadSlicerFile}, no audio file found`);

      event.reply(ACTION.slicerFileLoaded, {
        file,
        error: 'No Audio file in this path found. Maybe it was deleted in the meantime.',
        channelData: EMPTY
      });
    }
  } catch (error) {
    const errorMsg = `${ACTION.loadSlicerFile}, raising ${error}`;
    logError(errorMsg);

    event.reply(ACTION.slicerFileLoaded, {
      file,
      error: errorMsg,
      channelData: EMPTY
    });
  }
}

function exportSlicerFile(event, { channelData, start, end, offset, sampleRate, duration }) {
  try {
    logInfo(`${ACTION.exportSlicerFile}`);

    const path = dialog.showSaveDialogSync({ title: 'Export Audio Slice' });

    if (path) {
      // slice section for each channel
      const channelDataSlice = channelData.map(channel => {
        const offsetX = Math.floor((offset / duration) * channel.length);
        const startX = Math.floor((start / duration) * channel.length);
        const endX = Math.floor((end / duration) * channel.length);

        return channel.slice(startX + offsetX, endX + offsetX);
      });

      // encode channel slice to wav
      const buffer = wav.encode(channelDataSlice, {
        sampleRate,
        float: true,
        bitDepth: 32
      });

      // write file
      fs.writeFileSync(path, buffer);

      logInfo(`${ACTION.exportSlicerFile} successful`);
      event.reply(ACTION.slicerFileExported, {
        notification: {
          content: 'Exporting Audio Slice successful.',
          type: 'info'
        }
      });
    }
  } catch (error) {
    const errorMsg = `${ACTION.exportSlicerFile}, raising ${error}`;
    logError(errorMsg);

    event.reply(ACTION.slicerFileExported, {
      notification: {
        content: 'Exporting Audio Slice failed.',
        type: 'error'
      }
    });
  }
}

// ==============================================================
try {
  ipcMain.on(ACTION.loadSlicerFile, loadAudioFile);
  ipcMain.on(ACTION.exportSlicerFile, exportSlicerFile);
} catch (error) {
  logError(error);
}
