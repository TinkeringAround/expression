import styled from 'styled-components';

export const SDrawing = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  background: ${({ theme: { light } }) => light};

  overflow: auto hidden;

  ::-webkit-scrollbar-track {
    background-color: ${({ theme: { light } }) => light};
  }

  ::-webkit-scrollbar {
    height: 2rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme: { yellow } }) => yellow};
    border-radius: 2px;

    border-right: 7px ${({ theme: { light } }) => light} solid;
    border-left: 7px ${({ theme: { light } }) => light} solid;
    border-bottom: 0.75rem ${({ theme: { light } }) => light} solid;
    border-top: 0.5rem ${({ theme: { light } }) => light} solid;

    background-clip: padding-box;

    &:hover {
      background-color: ${({ theme: { hexToRgbA, yellow } }) => hexToRgbA(yellow, '0.8')};
    }
  }

  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`;
