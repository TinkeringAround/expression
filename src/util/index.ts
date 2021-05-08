import { getElectronMock } from '../mock/electron';
import { TElectron } from '../react-app-env';

if (!window.electron) {
  window.electron = getElectronMock();
}

export const bytesToMegaBytes: (bytes: number) => string = bytes =>
  `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

export const getElectron: () => TElectron = () => ({
  dispatch: window.electron.dispatch,
  trigger: window.electron.trigger,
  on: window.electron.on,
  isDev: window.electron.isDev
});
