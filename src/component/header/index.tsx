import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SHeader } from './styled';
import { Features } from '../../features';
import { getFeatureNameByPath } from '../../util';

const Header: FC = () => {
  const { pathname } = useLocation();

  return (
    <SHeader>
      <Link to={Features.DASHBOARD}>
        <div className="logo">{getFeatureNameByPath(pathname)}</div>
      </Link>
      <div className="controls" />
      <div className="settings" />
    </SHeader>
  );
};

export default Header;
