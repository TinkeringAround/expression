import styled from 'styled-components';
import { Resizable } from 're-resizable';

export const SGridSidepane = styled(Resizable)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50px;

  background: ${({ theme: { white } }) => white};
  border-right: 3px solid ${({ theme: { light } }) => light};

  box-sizing: border-box;
  transition: background 0.15s ease-in-out 0.1s, border-right 0.1s ease-in-out;

  outline: none;

  &:hover {
    border-right: 3px solid ${({ theme: { yellow } }) => yellow};
  }

  &:active {
    background: ${({ theme: { hexToRgbA, white } }) => hexToRgbA(white, '0.8')};
  }
`;
