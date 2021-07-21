import React, { FC } from 'react';
import styled from 'styled-components';

import { anyFunction } from '../../lib/util';
import { AudioType } from '../../lib/audio/types';
import { NotificationType } from '../../store/notification/types';

const SIcon = styled.span<{ clickable: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`;

export type IconType =
  | AudioType
  | 'arrow-double-left'
  | 'arrow-double-right'
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
  iconType && <SIcon className={`icon icon-${iconType}`} onClick={onClick} clickable={!!onClick} />;

export default Icon;
