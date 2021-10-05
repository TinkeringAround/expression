import styled from 'styled-components';

export const SInput = styled.div`
  --height: 2rem;

  position: relative;

  flex: 1;
  height: var(--height);

  box-sizing: border-box;

  .icon {
    position: absolute;
    top: 0.625rem;
    right: 0.75rem;

    font-size: 0.75rem;

    cursor: pointer;
    transition: color 0.15s ease-in-out;

    &:hover {
      color: ${({ theme: { yellow } }) => yellow};
    }
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0.25rem 2rem 0.25rem 0.75rem;

    font-family: 'Roboto', sans-serif;
    font-size: calc(var(--height) / 2.5);
    background: ${({ theme: { light } }) => light};

    border-radius: 3px;
    border: solid 2px transparent;
    outline: none;
    box-sizing: border-box;

    transition: border 0.15s ease-in-out;

    &:hover {
      border: solid 2px ${({ theme: { grey } }) => grey};
    }

    &:active,
    &:focus {
      border: solid 2px ${({ theme: { yellow } }) => yellow};
    }
  }
`;
