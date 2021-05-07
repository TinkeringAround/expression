import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Features } from '../../features';

import { SDashboard } from './styled';

const Dashboard: FC = () => {
  const [routeLinks] = useState([Features.SLICER, Features.FX, Features.PHASER]);

  return (
    <SDashboard>
      {Object.keys(Features)
        .filter(route => route !== 'DASHBOARD')
        .map((route: string, index: number) => (
          <Link key={route} to={routeLinks[index]}>
            {route}
          </Link>
        ))}
    </SDashboard>
  );
};

export default Dashboard;
