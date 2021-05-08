import { TElectron } from '../react-app-env';

export const getElectronMock: () => TElectron = () => ({
  trigger: jest.fn(),
  dispatch: jest.fn(),
  on: () => {},
  isDev: true
});
