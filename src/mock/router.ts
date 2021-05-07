import { Features } from '../features';

export const mockLocation = (route: Features = Features.DASHBOARD) => ({
  pathname: route,
  search: '',
  hash: '',
  state: undefined
});
