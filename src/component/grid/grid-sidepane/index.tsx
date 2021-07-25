import React, { FC, useCallback, useState } from 'react';

import Icon, { IconType } from '../../icon';

import { SGridSidepane } from './styled';

interface Props {
  collapseWidth?: string;
  minWidth?: number;
  maxWidth?: number;
  defaultSize?: {
    width: number | string;
    height: number | string;
  };
}

const GridSidepane: FC<Props> = ({
  children,
  minWidth = 225,
  maxWidth = 400,
  defaultSize = {
    width: 300,
    height: '100%'
  },
  collapseWidth = '2rem'
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggle = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded, setExpanded]);

  const icon: IconType = expanded ? 'arrow-double-left' : 'arrow-double-right';

  return (
    <SGridSidepane
      defaultSize={defaultSize}
      minWidth={expanded ? minWidth : collapseWidth}
      maxWidth={expanded ? maxWidth : collapseWidth}
      minHeight="100%"
      maxHeight="100%"
      enable={expanded ? { right: true } : undefined}
    >
      <Icon iconType={icon} onClick={toggle} />
      {expanded && children}
    </SGridSidepane>
  );
};

export default GridSidepane;
