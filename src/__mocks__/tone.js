class ToneAudioBuffer {
  _buffer;

  get duration() {
    return 10000;
  }

  get numberOfChannels() {
    return 2;
  }

  get sampleRate() {
    return 44100;
  }

  static fromArray(array) {
    return new ToneAudioBuffer().fromArray(array);
  }

  fromArray(array) {
    this._buffer = array;
    return this;
  }
}

module.exports = {
  ToneAudioBuffer
};
