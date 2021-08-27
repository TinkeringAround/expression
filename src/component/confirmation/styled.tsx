import styled from 'styled-components';

export const SConfirmation = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 175px;

  box-sizing: border-box;
  cursor: default;

  .icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  p {
    height: calc(100% - 100px - 1rem);
    margin: 0;

    font-size: 1.25rem;
    line-height: 2;
    text-align: center;
  }

  button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;

    max-height: 50px;
    max-width: 50%;
  }
`;
