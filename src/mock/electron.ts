export const mockElectronTrigger = (fn: (_: any, data: any) => void) =>
  jest.spyOn(window.electron, 'trigger').mockImplementation((_, data) => fn(null, data));

export const mockElectronDispatch = (fn: (_: any, data: any) => void) =>
  jest.spyOn(window.electron, 'dispatch').mockImplementation((_, data) => fn(null, data));
