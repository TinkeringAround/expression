import React, { FC, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

const SSpinner = styled.div`
  --c: linear-gradient(currentColor 0 0);

  width: 60px;
  height: 80px;
  background: var(--c) 0 50%, var(--c) 50% 50%, var(--c) 100% 50%;

  background-size: 9px 50%;
  background-repeat: no-repeat;

  animation: spinner-animation 1s infinite linear alternate;

  @keyframes spinner-animation {
    20% {
      background-size: 9px 20%, 9px 50%, 9px 50%;
    }
    40% {
      background-size: 9px 100%, 9px 20%, 9px 50%;
    }
    60% {
      background-size: 9px 50%, 9px 100%, 9px 20%;
    }
    80% {
      background-size: 9px 50%, 9px 50%, 9px 100%;
    }
  }
`;

interface Props {
  color?: string;
}

const Spinner: FC<Props> = ({ color = 'yellow' }) => {
  const theme = useContext(ThemeContext);

  return <SSpinner role="spinner" style={{ color: theme[color] }} />;
};

export default Spinner;
