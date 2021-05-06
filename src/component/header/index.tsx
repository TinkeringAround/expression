import React, { FC, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SHeader } from './styled';
import { Routes } from '../../routes';

const Header: FC = () => {
  const { pathname } = useLocation();

  const getFeatureName = useCallback(() => {
    switch (pathname) {
      case Routes.DASHBOARD:
        return 'Dashboard';
      case Routes.FX:
        return 'FX';
      case Routes.SLICER:
        return 'Slicer';
    }
  }, [pathname]);

  return (
    <SHeader>
      <Link to={Routes.DASHBOARD}>
        <div className="logo">K</div>
      </Link>
      <div className="controls" />
      <div className="settings">
        <h1>{getFeatureName()}</h1>
      </div>
    </SHeader>
  );
};

export default Header;
