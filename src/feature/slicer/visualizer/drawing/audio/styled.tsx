import styled from 'styled-components';

export const SAudio = styled.svg`
  position: absolute;
  top: 0;
  left: 0;

  height: calc(100% - 4rem);

  padding: 0 7px; // must be the same value as area-selection selector width

  box-sizing: border-box;
  z-index: 3;

  polyline {
    fill: none;
    stroke: ${props => props.theme.yellow};
    stroke-width: 3px;
  }
`;
