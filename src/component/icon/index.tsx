import React, { FC } from 'react';
import styled from 'styled-components';

import { anyFunction } from '../../util';
import { AudioType } from '../../audio/types';
import { NotificationType } from '../../store/notification/types';

const SIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export type IconType =
  | AudioType
  | 'upload'
  | 'save'
  | 'play'
  | 'pause'
  | 'stop'
  | 'first'
  | 'last'
  | 'cross'
  | 'trash'
  | 'foreward'
  | 'backward'
  | NotificationType;

interface Props {
  iconType: IconType | null;

  onClick?: anyFunction;
}

const Icon: FC<Props> = ({ iconType, onClick }) =>
  iconType && <SIcon className={`icon icon-${iconType}`} onClick={onClick} />;

export default Icon;
