const fs = require('fs');
const wav = require('node-wav');

// ==============================================================
async function decode(path, audioType) {
  if (audioType === 'wav') {
    const buffer = fs.readFileSync(path);
    const { channelData } = wav.decode(buffer);

    return channelData;
  }

  return null;
}

module.exports = {
  decode
};
