import React, { FC, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SHeader } from './styled';
import { Features } from '../../features';
import { featurePathToName } from '../../util';

const Header: FC = () => {
  const { pathname } = useLocation();

  const getFeatureName = useCallback(() => {
    if (pathname === Features.DASHBOARD) return 'Kadenz';
    return featurePathToName(pathname);
  }, [pathname]);

  return (
    <SHeader>
      <Link to={Features.DASHBOARD}>
        <div className="logo">{getFeatureName()}</div>
      </Link>
      <div className="controls" />
      <div className="settings" />
    </SHeader>
  );
};

export default Header;
