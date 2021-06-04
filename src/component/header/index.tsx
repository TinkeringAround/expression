import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Features } from '../../features';
import { featureToNameByPath } from '../../util';

import { SHeader } from './styled';

const Header: FC = () => {
  const { pathname } = useLocation();

  return (
    <SHeader>
      <Link to={Features.DASHBOARD}>
        <div className="logo">{featureToNameByPath(pathname)}</div>
      </Link>
      <div className="controls" />
      <div className="settings" />
    </SHeader>
  );
};

export default Header;
