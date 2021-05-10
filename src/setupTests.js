// set mock eletron on jest test environment
window.electron = {
  trigger: jest.fn(),
  dispatch: jest.fn(),
  on: () => {},
  isDev: false
};
