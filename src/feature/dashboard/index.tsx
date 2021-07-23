import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { FeatureDescription, Features } from '../../features';

import For from '../../component/for';

import { SDashboard } from './styled';

const Dashboard: FC = () => {
  const [routeLinks] = useState([Features.SLICER, Features.PHRASER, Features.FX]);
  const [enabledLinks] = useState([0, 1]);

  return (
    <SDashboard>
      <For
        values={Object.keys(Features).splice(1, 3)}
        projector={(route: string, index: number) => {
          const enabled = enabledLinks.includes(index);
          const link = enabled ? routeLinks[index] : Features.DASHBOARD;
          const className = enabled ? '' : 'disabled';

          return (
            <Link key={route} to={link} className={className}>
              <h1>{route}</h1>
              <p>{FeatureDescription[route]}</p>
            </Link>
          );
        }}
      />
    </SDashboard>
  );
};

export default Dashboard;
