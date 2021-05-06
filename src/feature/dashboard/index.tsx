import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../routes';

import { SDashboard } from './styled';

const Dashboard: FC = () => {
  const [routeLinks] = useState([Routes.SLICER, Routes.FX]);

  return (
    <SDashboard>
      {Object.keys(Routes)
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
