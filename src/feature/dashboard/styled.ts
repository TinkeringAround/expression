import styled from 'styled-components';

export const SDashboard = styled.div`
  flex-direction: row;
  flex-wrap: wrap;

  height: auto !important; // must be important to override parent styling
  padding: 3rem;

  box-sizing: border-box;

  a {
    // used for smooth animation
    position: relative;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    width: 47.5%;
    height: 150px;

    padding-left: 2rem;

    color: ${({ theme: { black } }) => black};
    background: ${({ theme: { white } }) => white};

    border-radius: 1rem;
    border-left: 20px solid ${({ theme: { yellow } }) => yellow};

    box-sizing: border-box;
    text-decoration: none;
    transition: all 0.15s ease-in-out;

    h1 {
      margin: 0;

      font-size: 3rem;
      font-weight: normal;
      font-family: 'Mono', sans-serif;
      line-height: 3rem;
    }

    p {
      position: relative;
      right: 0;

      margin: 0.5rem 0 0;
      padding-right: 2rem;

      font-size: 1rem;
      font-family: 'Roboto', sans-serif;
    }

    &.disabled {
      background: ${({ theme: { hexToRgbA, grey } }) => hexToRgbA(grey, '0.5')};

      border-left: 20px solid ${({ theme: { grey } }) => grey};

      cursor: default;
    }

    &:nth-child(even) {
      margin-left: 5%;
    }

    &:not(:last-child) {
      margin-bottom: 3rem;
    }

    &:not(.disabled):hover {
      left: 1rem;

      background: ${({ theme: { yellow } }) => yellow};
    }
  }
`;
