import styled from 'styled-components';

export const SExport = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 1rem 0 2rem;

  box-sizing: border-box;
  overflow: hidden;

  h1 {
    width: 100%;
    margin: 0;
    padding: 1rem 0;

    background: ${({ theme: { white } }) => white};
    text-align: center;

    z-index: 2;
  }

  p {
    width: 85%;
    margin: 0;

    font-size: 0.9rem;
  }

  button {
    position: absolute;
    bottom: 2rem;
    left: 15%;

    width: 70%;
  }
`;
