import React, { FC } from 'react';
import styled from 'styled-components';

import { fadeIn } from '../../animations';

const SContent = styled.main`
  position: fixed;
  top: 70px;

  height: calc(100vh - 70px);
  width: 100%;

  & > * {
    display: flex;

    width: inherit;
    height: inherit;

    animation: fadeIn 1s ease-in-out;
  }

  ${fadeIn()}
`;

const Content: FC = ({ children }) => <SContent>{children}</SContent>;

export default Content;
