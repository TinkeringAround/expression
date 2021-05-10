export const mockElectronTrigger = (fn: (_: any, data: any) => void) =>
  jest.spyOn(window.electron, 'trigger').mockImplementation((_, data) => fn(null, data));
