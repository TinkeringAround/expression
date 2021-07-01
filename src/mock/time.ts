import { Seconds } from 'tone/build/esm/core/type/Units';
import { TimeValue } from 'tone/Tone/core/type/TimeBase';

class TimeClass<T = Seconds> {
  _value: TimeValue;

  constructor(value: TimeValue) {
    this._value = value;
  }

  toSeconds() {
    return this._value as Seconds;
  }
}

const Time = (value: TimeValue): TimeClass => new TimeClass<Seconds>(value);

export default Time;
