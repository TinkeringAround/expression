import styled from 'styled-components';

import { fromTop } from '../../animations';

export const SHeader = styled.header`
  --size: 70px;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: var(--size);
  width: 100vw;

  background: ${props => props.theme.yellow};

  animation: fromTop 0.5s ease-in-out;

  ${fromTop('-5rem', '0')}

  z-index: 10;

  a {
    text-decoration: none;
    outline: none;

    height: var(--size);
    width: calc(var(--multiplier) * var(--size));

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;

      height: inherit;
      width: inherit;

      font-family: 'Mono', sans-serif;
      font-size: 2.5rem;
      color: ${props => props.theme.black};

      background: transparent;
      transition: all 0.15s ease-in-out;

      cursor: pointer;

      &:hover {
        color: ${props => props.theme.white};
        background: ${props => props.theme.orange};
      }
    }
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    flex: 1;
  }

  .settings {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: var(--size);
  }
`;
