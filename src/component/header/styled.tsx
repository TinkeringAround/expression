import styled from 'styled-components';
import { fromTop } from '../../animations';

export const SHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 70px;
  width: 100vw;

  background: ${props => props.theme.blue};

  animation: fromTop 0.5s ease-in-out;

  ${fromTop('-5rem', '0')}

  z-index: 10;

  a {
    text-decoration: none;
    outline: none;

    height: inherit;
    width: 70px;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;

      height: inherit;
      width: inherit;

      font-family: 'Mono', sans-serif;
      font-size: 3.5rem;
      color: ${props => props.theme.yellow};

      background: transparent;
      transition: background 0.15s ease-in-out;

      cursor: pointer;

      &:hover {
        background: ${props => props.theme.white};
      }
    }
  }

  .controls {
    height: inherit;
    flex: 11;
  }

  .settings {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    height: inherit;

    padding-right: 1rem;

    h1 {
      margin: 0;

      font-size: 2rem;
      color: ${props => props.theme.white};
    }
  }
`;
