import styled from 'styled-components';

import { noScrollbar } from '../../../../../../scrollbar';

export const SEditor = styled.div`
  --height: calc(100px + 2.25rem);
  --fontSize: 20px;
  --lineHeight: calc((var(--height) - 2rem) / 4.5);

  position: relative;

  width: 100%;
  height: var(--height);

  textarea {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    padding: 1rem;

    font-family: 'Roboto', sans-serif;
    font-size: var(--fontSize);
    line-height: var(--lineHeight);
    color: ${({ theme: { black } }) => black};
    background: transparent;

    border: 3px solid transparent;
    outline: none;
    border-radius: 3px;

    white-space: pre;
    overflow-wrap: normal;

    box-sizing: border-box;
    resize: none;
    overflow: auto hidden;
    transition: border 0.15s ease-in-out;
    z-index: 2;

    ${noScrollbar};

    &:focus {
      border: 3px solid ${({ theme: { yellow } }) => yellow};
    }
  }

  div.highlighting {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
    margin: 0;
    padding: 1rem;

    font-family: 'Roboto', sans-serif;
    font-size: var(--fontSize);
    line-height: var(--lineHeight);
    color: transparent;
    background: ${({ theme: { white } }) => white};

    border: 3px solid transparent;

    white-space: pre;
    overflow-wrap: normal;

    overflow: auto hidden;
    box-sizing: border-box;
    z-index: 0;

    ${noScrollbar};

    span.yellow {
      color: transparent;
      background: ${({ theme: { yellow } }) => yellow};
    }
  }
`;
