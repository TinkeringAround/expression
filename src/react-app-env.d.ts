export type TElectron = {
  dispatch: (channel: string, data?: object) => void;
  trigger: (channel: string, data?: object) => void;
  on: (channel: string, fn: Function) => any;
  isDev: boolean;
};

declare global {
  interface Window {
    electron: TElectron;
  }
}
