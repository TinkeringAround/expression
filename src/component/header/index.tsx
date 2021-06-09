import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Features } from '../../features';
import { featureToNameByPath } from '../../util';

import Controls from '../controls';

import { SHeader } from './styled';

const Header: FC = () => {
  const { pathname } = useLocation();

  const multiplier = pathname === Features.DASHBOARD ? '4' : '1';

  return (
    <SHeader>
      <Link
        to={Features.DASHBOARD}
        style={{
          // @ts-ignore
          '--multiplier': multiplier
        }}
      >
        <div className="logo">{featureToNameByPath(pathname)}</div>
      </Link>
      <section className="controls">
        <Controls feature={pathname} />
      </section>
      <section className="settings" />
    </SHeader>
  );
};

export default Header;
