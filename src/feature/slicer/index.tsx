import React, { FC } from 'react';

import { Grid, GridSidepane, GridContent, GridTabs } from '../../component/grid';
import { Notifications } from '../../component/tabs';

import DropZone from './drop-zone';
import Info from './info';
import Visualizer from './visualizer';
import Hint from './hint';
import Export from './export';

import { SSlicer } from './styled';

const Slicer: FC = () => (
  <Grid>
    <GridSidepane>
      <DropZone />
    </GridSidepane>

    <GridContent>
      <SSlicer>
        <Info />
        <Visualizer />
        <Hint />
      </SSlicer>
    </GridContent>

    <GridTabs
      tabs={[
        { name: 'Export', component: <Export /> },
        { name: 'Notifications', component: <Notifications /> }
      ]}
      initialTab={0}
    />
  </Grid>
);

export default Slicer;
