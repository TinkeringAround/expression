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

  background: ${props => props.theme.yellow};

  animation: fromTop 0.5s ease-in-out;

  ${fromTop('-5rem', '0')}

  z-index: 10;

  a {
    text-decoration: none;
    outline: none;

    height: 100%;

    .logo {
      display: flex;
      align-items: center;

      height: inherit;
      width: inherit;

      padding: 0 1rem;

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
    height: 100%;
    flex: 11;
  }

  .settings {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    height: 100%;

    padding-right: 1rem;
  }
`;
