import { mockResizeObserver } from './mock/window';

// mock resize observer globally
mockResizeObserver();

// set mock electron on jest test environment
window.electron = {
  trigger: jest.fn(),
  dispatch: jest.fn(),
  on: () => {},
  isDev: false
};
