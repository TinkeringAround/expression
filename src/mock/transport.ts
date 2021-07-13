import { PlaybackState } from 'tone';
import { NormalRange, Seconds, Time } from 'tone/build/esm/core/type/Units';

import { anyFunction } from '../lib/util';

type TransportEventNames = 'start' | 'stop' | 'pause' | 'loop' | 'loopEnd' | 'loopStart';

class TransportMock {
  private _state: PlaybackState = 'stopped';
  private _seconds: Seconds = 0;
  private _progress: NormalRange = 0;
  private _loop: boolean = false;
  private _loopStart: Time = 0;
  private _loopEnd: Time = 0;
  private _eventListener: { [key: string]: anyFunction } = {};

  set seconds(seconds: Seconds) {
    this._seconds = seconds;
  }

  set loop(loop: boolean) {
    this._loop = loop;
  }

  set progress(progress: NormalRange) {
    this._progress = progress;
  }

  get state() {
    return this._state;
  }

  get seconds() {
    return this._seconds;
  }

  get loop() {
    return this._loop;
  }

  get loopStart() {
    return this._loopStart;
  }

  get loopEnd() {
    return this._loopEnd;
  }

  get progress() {
    return this._progress;
  }

  start() {
    this._state = 'started';
    if (this._eventListener['start']) {
      this._eventListener['start']();
    }
  }

  pause() {
    this._state = 'paused';
    if (this._eventListener['pause']) {
      this._eventListener['pause']();
    }
  }

  stop() {
    this._state = 'stopped';
    if (this._eventListener['stop']) {
      this._eventListener['stop']();
    }
  }

  on(event: TransportEventNames, callback: anyFunction) {
    this._eventListener[event] = callback;
  }

  cancel() {}

  /**
   * Test Function only
   */
  triggerLoopStart() {
    if (this._eventListener['loopStart']) {
      this._eventListener['loopStart']();
    } else throw new Error('No callback registered for "loopStart" event.');
  }

  /**
   * Test Function only
   */
  triggerLoopEnd() {
    if (this._eventListener['loopEnd']) {
      this._eventListener['loopEnd']();
    } else throw new Error('No callback registered for "loopEnd" event.');
  }

  /**
   * Test Function only
   */
  setLoopPoints(startPosition: Time, endPosition: Time) {
    this._loopStart = startPosition;
    this._loopEnd = endPosition;
  }
}

const Transport = new TransportMock();

export default Transport;
