import React, { FC } from 'react';
import styled from 'styled-components';

import { AudioType } from '../../audio/types';

const SIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  iconType: AudioType | 'file-add' | null;
}

const Icon: FC<Props> = ({ iconType }) => <SIcon className={`icon icon-${iconType}`} />;

export default Icon;
