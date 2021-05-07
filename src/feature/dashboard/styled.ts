import styled from 'styled-components';

export const SDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 2rem;

  box-sizing: border-box;

  a {
    position: relative;
    left: 0;

    display: flex;
    align-items: center;

    width: inherit;
    height: 100px;

    padding-left: 2rem;

    background: ${props => props.theme.yellow};
    font-size: 3rem;
    font-family: 'Mono', sans-serif;
    color: ${props => props.theme.blue};

    border-radius: 0.25rem;

    box-sizing: border-box;
    text-decoration: none;
    transition: background 0.15s ease-in-out, left 0.1s ease-in-out;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    &:hover {
      left: 1rem;
      background: ${props => props.theme.orange50};
    }
  }
`;
