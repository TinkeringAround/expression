import styled from 'styled-components';

export const SAudioVisualizerAreaSelection = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;

  width: calc(100% - 2rem);
  height: calc(100% - 2rem);

  border-radius: 0.25rem;

  z-index: 4;

  & > [role*='border'] {
    opacity: 0;
  }

  :hover {
    & > [role*='border'] {
      opacity: 1;
    }
  }
`;

export const SSelector = styled.div`
  position: absolute;
  top: -0.5rem;

  height: calc(100% + 1rem);

  border-radius: 2px;
  background: ${props => props.theme.green};

  z-index: 6;

  cursor: grab;
  transition: opacity 0.15s ease-in-out;
`;

export const SSelectedArea = styled.div`
  position: absolute;
  top: 0;

  height: 100%;

  border-radius: 2px;
  background: ${props => props.theme.hexToRgbA(props.theme.green, '0.3')};

  z-index: 5;
`;
