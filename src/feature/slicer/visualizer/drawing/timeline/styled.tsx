import styled from 'styled-components';

export const STimeline = styled.svg`
  position: absolute;
  top: 0;
  left: 0;

  padding: 0 7px; // must be the same value as area-selection selector width

  box-sizing: border-box;
  z-index: 2;

  polyline {
    fill: none;
  }

  polyline[role='step'] {
    stroke-width: 2;
    stroke: ${props => props.theme.hexToRgbA(props.theme.grey, '1')};
  }

  polyline[role='line'] {
    stroke-width: 2;
    stroke: ${props => props.theme.hexToRgbA(props.theme.grey, '0.2')};
  }

  polyline[role='baseline'] {
    stroke-width: 5;
    stroke: ${props => props.theme.hexToRgbA(props.theme.grey, '1')};
  }

  text {
    font-size: 0.7rem;
    fill: black;

    text-anchor: middle;
    dominant-baseline: central;
  }
`;
