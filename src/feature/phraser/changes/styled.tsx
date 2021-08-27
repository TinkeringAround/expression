import styled from 'styled-components';

import { noScrollbar } from '../../../scrollbar';

export const SChanges = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 0 0 1rem 0;

  background: ${({ theme: { white } }) => white};

  box-sizing: border-box;
  overflow: hidden auto;

  h1 {
    position: sticky;
    top: 0;
    left: 0;

    width: 100%;
    margin: 0;
    padding: 2rem 0 1rem 0;

    font-family: 'Mono', sans-serif;
    font-weight: normal;
    font-size: 1.5rem;
    text-align: center;
    background: ${({ theme: { white } }) => white};
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    &:not(:first-of-type) {
      margin-top: 1.5rem;
    }

    h2 {
      margin: 0 0 0.25rem;

      font-size: 0.8rem;
      font-weight: normal;
      color: ${({ theme: { grey } }) => grey};
    }
  }

  ${noScrollbar};
`;
