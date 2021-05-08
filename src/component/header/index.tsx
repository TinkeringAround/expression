import React, { FC, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SHeader } from './styled';
import { Features } from '../../features';

const Header: FC = () => {
  const { pathname } = useLocation();

  const getFeatureName = useCallback(() => {
    switch (pathname) {
      case Features.DASHBOARD:
        return 'Dashboard';
      case Features.FX:
        return 'FX';
      case Features.SLICER:
        return 'Slicer';
    }
  }, [pathname]);

  return (
    <SHeader>
      <Link to={Features.DASHBOARD}>
        <div className="logo">KADENZ</div>
      </Link>
      <div className="controls" />
      <div className="settings">
        <h1>{getFeatureName()}</h1>
      </div>
    </SHeader>
  );
};

export default Header;
