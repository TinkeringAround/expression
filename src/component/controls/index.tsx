import React, { FC, Fragment } from 'react';

import { Features } from '../../features';

import If from '../if';

import SlicerControls from './slicer-controls';
import PhraserControls from './phraser-controls';

interface Props {
  feature: string;
}

const Controls: FC<Props> = ({ feature }) => (
  <Fragment>
    <If condition={feature === Features.SLICER}>
      <SlicerControls />
    </If>
    <If condition={feature === Features.PHRASER}>
      <PhraserControls />
    </If>
  </Fragment>
);

export default Controls;
