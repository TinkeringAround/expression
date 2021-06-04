import styled from 'styled-components';

export const SDrawing = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  background: ${props => props.theme.light};

  overflow: auto hidden;

  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.light};
  }

  ::-webkit-scrollbar {
    height: 2rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.yellow};
    border-radius: 2px;

    border-right: 7px ${props => props.theme.light} solid;
    border-left: 7px ${props => props.theme.light} solid;
    border-bottom: 0.75rem ${props => props.theme.light} solid;
    border-top: 0.5rem ${props => props.theme.light} solid;

    background-clip: padding-box;

    &:hover {
      background-color: ${props => props.theme.hexToRgbA(props.theme.yellow, '0.8')};
    }
  }

  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`;
