import { BasicPlaybackState } from 'tone';
import ToneAudioBuffer from './tone-audio-buffer';

class Player {
  private _state: BasicPlaybackState = 'stopped';
  private _buffer: ToneAudioBuffer = new ToneAudioBuffer();

  set buffer(buffer: ToneAudioBuffer) {
    this._buffer = buffer;
  }

  get state() {
    return this._state;
  }

  toDestination() {
    return this;
  }

  sync() {
    return this;
  }

  start() {
    this._state = 'started';
  }

  stop() {
    this._state = 'stopped';
  }

  seek() {}

  constructor() {}
}

export default Player;
