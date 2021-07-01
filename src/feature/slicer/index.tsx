import React, { FC } from 'react';

import DropZone from './drop-zone';
import Info from './info';
import Visualizer from './visualizer';
import Hint from './hint';

import { SSlicer } from './styled';

const Slicer: FC = () => (
  <SSlicer>
    <DropZone />

    <div className="wrapper">
      <div className="content">
        <Info />
        <Visualizer />
        <Hint />
      </div>
    </div>
  </SSlicer>
);

export default Slicer;
