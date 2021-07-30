import styled from 'styled-components';

export const STemplates = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding-top: 2rem;

  background: ${({ theme: { white } }) => white};

  box-sizing: border-box;
  transition: background 0.15s ease-in-out;

  h1 {
    width: 100%;
    margin: 0;
    padding: 0 0 1rem 0;

    font-family: 'Mono', sans-serif;
    font-weight: normal;
    font-size: 1.5rem;
    text-align: center;
  }

  p {
    width: 80%;
    margin: 0 0 2rem;

    font-size: 0.9rem;
  }
`;

export const STemplate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80%;
  padding: 1rem 0.5rem;

  background: ${({ theme: { light } }) => light};
  border-radius: 3px;

  box-sizing: border-box;
  transition: color 0.15s ease-in-out, background 0.15s ease-in-out;

  &:hover,
  &:active {
    color: ${({ theme: { second } }) => second};
    background: ${({ theme: { yellow } }) => yellow};
  }

  h4 {
    margin: 0;
  }

  p {
    margin: 0.25rem 0 0;

    font-size: 0.8rem;
    text-align: center;
    color: ${({ theme: { second } }) => second};
  }

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;
