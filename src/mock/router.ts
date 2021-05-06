import { Routes } from '../routes';

export const mockLocation = (route: Routes = Routes.DASHBOARD) => ({
  pathname: route,
  search: '',
  hash: '',
  state: undefined
});
