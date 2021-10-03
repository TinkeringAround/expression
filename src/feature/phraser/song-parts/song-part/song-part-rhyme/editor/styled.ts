import styled from 'styled-components';

import { noScrollbar } from '../../../../../../scrollbar';

export const SEditor = styled.div`
  --height: calc(100px + 2.25rem);
  --fontSize: 20px;
  --lineHeight: calc((var(--height) - 2rem) / 4.5);

  position: relative;

  width: 100%;
  height: var(--height);

  div.syllables {
    position: absolute;
    top: 0;
    left: 0;

    width: 2rem;
    height: 100%;

    padding: 1rem 0 1rem 0.25rem;
    margin: 0;

    border: 3px solid transparent;
    box-sizing: border-box;
    z-index: 3;

    ${noScrollbar};

    & > b {
      display: block;

      height: calc(var(--fontSize) * 1.15);

      font-family: 'Roboto', sans-serif;
      font-size: calc(var(--fontSize) / 1.75);
      line-height: var(--lineHeight);
      color: ${({ theme: { yellow } }) => yellow};

      text-align: center;
      white-space: pre;
      overflow-wrap: normal;

      box-sizing: border-box;
    }
  }

  textarea,
  div.highlighting {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    padding: 1rem 2rem;
    margin: 0;

    font-family: 'Roboto', sans-serif;
    font-size: var(--fontSize);
    line-height: var(--lineHeight);

    white-space: pre;
    overflow-wrap: normal;

    border-radius: 3px;
    overflow: auto hidden;
    box-sizing: border-box;

    ${noScrollbar};
  }

  textarea {
    color: ${({ theme: { black } }) => black};
    background: transparent;

    border: 3px solid transparent;
    outline: none;

    resize: none;
    transition: border 0.15s ease-in-out;
    z-index: 2;

    &:focus {
      border: 3px solid ${({ theme: { yellow } }) => yellow};
    }
  }

  div.highlighting {
    color: transparent;
    background: ${({ theme: { white } }) => white};

    border: 3px solid transparent;

    z-index: 0;

    span.yellow {
      color: transparent;
      background: ${({ theme: { yellow } }) => yellow};
    }
  }
`;
