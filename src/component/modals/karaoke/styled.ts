import styled from 'styled-components';

import { fadeIn } from '../../../animations';

export const SKaraoke = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  width: 100vw;
  padding: 3rem 4rem;

  background: ${({ theme: { yellow } }) => yellow};

  overflow: hidden auto;
  animation: fadeIn 0.25s ease-in-out;
  box-sizing: border-box;

  z-index: 100;

  ${fadeIn};

  ::-webkit-scrollbar-track {
    display: none;
  }

  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme: { black } }) => black};
    border-top: transparent solid 1rem;
    border-bottom: transparent solid 1rem;
    border-right: transparent solid 6px;

    background-clip: padding-box;

    &:hover {
      background-color: ${({ theme: { hexToRgbA, black } }) => hexToRgbA(black, '0.8')};
    }
  }

  .icon-cross {
    position: fixed;
    top: 2rem;
    right: 2.5rem;

    padding: 1rem;

    font-size: 1.5rem;
    background: ${({ theme: { light } }) => light};
    border-radius: 3px;

    transition: background 0.15s ease-in-out;
    box-sizing: border-box;

    &:hover {
      background: ${({ theme: { white } }) => white};
    }
  }

  span.line {
    display: block;

    width: 80%;
    padding: 1.5rem 0.5rem;

    color: ${({ theme: { black } }) => black};
    font-size: 2.5rem;

    text-align: center;

    transition: transform 0.15s ease-in-out, font-weight 0.15s ease-in-out;

    &:hover {
      transform: scale(1.05);
      font-weight: bold;
    }
  }
`;
