import React, { FC } from 'react';
import styled from 'styled-components';

const SIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  iconType: 'mp3' | 'wav' | 'file-add';
}

const Icon: FC<Props> = ({ iconType }) => <SIcon className={`icon icon-${iconType}`} />;

export default Icon;
