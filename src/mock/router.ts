import routeData from 'react-router';

import { Features } from '../features';

export const mockRouterLocation = (route: Features = Features.DASHBOARD) =>
  jest.spyOn(routeData, 'useLocation').mockReturnValue({
    pathname: route,
    search: '',
    hash: '',
    state: undefined
  });
