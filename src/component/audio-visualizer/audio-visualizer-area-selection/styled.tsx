import styled from 'styled-components';

export const SAudioVisualizerAreaSelection = styled.div`
  position: absolute;
  top: 0;
  left: 5px;

  width: 100%;
  height: 100%;

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
  top: 0;

  height: 100%;

  border-radius: 2px;
  background: ${props => props.theme.yellow};

  z-index: 6;

  cursor: grab;
  transition: opacity 0.15s ease-in-out;
`;

export const SSelectedArea = styled.div`
  position: absolute;
  top: 0;

  height: 100%;

  border-radius: 2px;
  background: ${props => props.theme.yellow20};

  z-index: 5;
`;
