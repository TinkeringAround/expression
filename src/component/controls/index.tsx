import React, { FC, Fragment } from 'react';

import { Features } from '../../features';

import SlicerControls from './slicer-controls';

interface Props {
  feature: string;
}

const Controls: FC<Props> = ({ feature }) => (
  <Fragment>{feature === Features.SLICER && <SlicerControls />}</Fragment>
);

export default Controls;
