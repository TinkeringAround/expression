import styled from 'styled-components';

export const SAreaSelection = styled.div`
  position: absolute;
  top: 1rem;
  left: 2rem;

  width: calc(100% - 4rem);
  height: calc(100% - 3rem);

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
  top: 20px;

  height: calc(100% - 40px);

  border-radius: 2px;
  background: ${({ theme: { green } }) => green};

  z-index: 6;
  cursor: grab;
  transition: opacity 0.15s ease-in-out;
`;

export const SArea = styled.div`
  position: absolute;
  top: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  height: calc(100% - 80px);

  border-radius: 2px;
  background: ${({ theme: { hexToRgbA, green } }) => hexToRgbA(green, '0.15')};

  z-index: 5;

  span {
    display: block;

    margin-bottom: 0.25rem;

    font-size: 0.8rem;
    font-weight: bold;
    color: ${({ theme: { green } }) => green};
  }
`;
