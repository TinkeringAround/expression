import styled from 'styled-components';

export const SDrawing = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

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

  div {
    position: absolute;
    height: 10px;

    background: ${props => props.theme.grey};
    border-radius: 2px;

    cursor: pointer;
    z-index: 10;
  }

  svg {
    height: 100%;

    padding: 0 7px; // must be the same value as area-selection selector width

    background: ${props => props.theme.light};
    box-sizing: border-box;

    polyline {
      fill: none;
      stroke: ${props => props.theme.yellow};
      stroke-width: 3px;
    }
  }
`;
