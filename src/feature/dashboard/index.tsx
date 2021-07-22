import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Features } from '../../features';

import For from '../../component/for';

import { SDashboard } from './styled';

const Dashboard: FC = () => {
  const [routeLinks] = useState([Features.SLICER, Features.FX, Features.PHRASER]);

  return (
    <SDashboard>
      <For
        values={Object.keys(Features).filter(route => route !== 'DASHBOARD')}
        projector={(route: string, index: number) => (
          <Link key={route} to={routeLinks[index]}>
            {route}
          </Link>
        )}
      />
    </SDashboard>
  );
};

export default Dashboard;
