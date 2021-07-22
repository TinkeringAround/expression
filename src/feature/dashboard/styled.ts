import styled from 'styled-components';

export const SDashboard = styled.div`
  flex-direction: column;
  align-items: center;

  padding: 3rem;

  box-sizing: border-box;

  a {
    position: relative;
    left: 0;

    display: flex;
    align-items: center;

    width: inherit;
    height: 100px;

    padding-left: 2rem;

    color: ${({ theme: { black } }) => black};
    background: ${({ theme: { white } }) => white};
    font-size: 3rem;
    font-family: 'Mono', sans-serif;

    border-radius: 1rem 3px 3px 1rem;
    border-left: 20px solid ${({ theme: { yellow } }) => yellow};

    box-sizing: border-box;
    text-decoration: none;
    transition: all 0.15s ease-in-out;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    &:hover {
      left: 1rem;

      background: ${({ theme: { yellow } }) => yellow};
    }
  }
`;
