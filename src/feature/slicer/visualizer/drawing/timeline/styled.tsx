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
    stroke: ${({ theme: { grey } }) => grey};
  }

  polyline[role='line'] {
    stroke-width: 2;
    stroke: ${({ theme: { hexToRgbA, grey } }) => hexToRgbA(grey, '0.2')};
  }

  polyline[role='baseline'] {
    stroke-width: 5;
    stroke: ${({ theme: { grey } }) => grey};
  }

  text {
    font-size: 0.7rem;
    fill: black;

    text-anchor: middle;
    dominant-baseline: central;
  }
`;
