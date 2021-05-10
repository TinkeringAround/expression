export type TElectron = {
  dispatch: (channel: string, data?: any) => void;
  trigger: (channel: string, data?: any) => void;
  on: (channel: string, fn: Function) => any;
  isDev: boolean;
};

declare global {
  interface Window {
    electron: TElectron;
  }
}
