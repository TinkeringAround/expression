export const mockElectronTrigger = (fn: (_: any, data: any) => void) =>
  jest.spyOn(window.electron, 'trigger').mockImplementationOnce((_, data) => fn(null, data));

export const mockElectronDispatch = (fn: (_: any, data: any) => void) =>
  jest.spyOn(window.electron, 'dispatch').mockImplementationOnce((_, data) => fn(null, data));
