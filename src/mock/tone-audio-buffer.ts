class ToneAudioBuffer {
  _buffer: any[];

  get duration() {
    return 10000;
  }

  get numberOfChannels() {
    return 2;
  }

  get sampleRate() {
    return 44100;
  }

  static fromArray(array: any[]) {
    return new ToneAudioBuffer().fromArray(array);
  }

  fromArray(array: any[]) {
    this._buffer = array;
    return this;
  }

  constructor() {
    this._buffer = [];
  }
}

export default ToneAudioBuffer;
