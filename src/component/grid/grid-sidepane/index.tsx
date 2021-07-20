import React, { FC } from 'react';

import { SGridSidepane } from './styled';

interface Props {
  side?: 'left' | 'right';
  minWidth?: number;
  maxWidth?: number;
  defaultSize?: {
    width: number | string;
    height: number | string;
  };
}

const GridSidepane: FC<Props> = ({
  side = 'left',
  children,
  minWidth = 225,
  maxWidth = 400,
  defaultSize = {
    width: 300,
    height: '100%'
  }
}) => (
  <SGridSidepane
    defaultSize={defaultSize}
    minWidth={minWidth}
    maxWidth={maxWidth}
    minHeight="100%"
    maxHeight="100%"
    enable={{ right: side === 'left', left: side === 'right' }}
  >
    {children}
  </SGridSidepane>
);

export default GridSidepane;
