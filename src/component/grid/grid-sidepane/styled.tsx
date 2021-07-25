import styled from 'styled-components';
import { Resizable } from 're-resizable';

export const SGridSidepane = styled(Resizable)`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${({ theme: { white } }) => white};
  border-right: 3px solid ${({ theme: { light } }) => light};

  box-sizing: border-box;
  transition: background 0.15s ease-in-out 0.1s, border-right 0.1s ease-in-out,
    max-width 0.2s ease-in-out, min-width 0.2s ease-in-out;

  outline: none;

  > .icon {
    position: absolute;
    top: 0;
    right: 0;

    height: 2rem;
    width: 2rem;

    font-size: 1.5rem;

    transition: color 0.15s ease-in-out;

    &:hover {
      color: ${({ theme: { yellow } }) => yellow};
    }
  }

  &:hover {
    border-right: 3px solid ${({ theme: { yellow } }) => yellow};
  }

  &:active {
    background: ${({ theme: { hexToRgbA, white } }) => hexToRgbA(white, '0.8')};
  }
`;
