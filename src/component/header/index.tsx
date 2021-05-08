import React, { FC, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SHeader } from './styled';
import { Features } from '../../features';

const Header: FC = () => {
  const { pathname } = useLocation();

  const getFeatureName = useCallback(() => {
    switch (pathname) {
      case Features.DASHBOARD:
        return 'Kadenz';
      case Features.FX:
        return 'FX';
      case Features.SLICER:
        return 'Slicer';
      case Features.PHRASER:
        return 'Phraser';
    }
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
