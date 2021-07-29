import styled from 'styled-components';

export const SPart = styled.div`
  position: relative;

  width: 100%;
  padding: 2rem;
  margin-bottom: 1rem;

  background: ${({ theme: { white } }) => white};
  border-radius: 3px;

  transition: height 0.1s ease-in-out;
  box-sizing: border-box;

  &:hover {
    .controls {
      opacity: 1;
    }
  }

  &.expanded {
    .part-name {
      margin-bottom: 1rem;
    }
  }

  .controls {
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;

    display: flex;
    flex-direction: row;

    opacity: 0;
    transition: opacity 0.15s ease-in-out 0.15s;

    .icon {
      font-size: 2rem;

      transition: opacity 0.15s ease-in-out 0.15s, color 0.15s ease-in-out;

      &:not(:last-of-type) {
        margin-right: 1rem;
      }

      &:hover {
        color: ${({ theme: { yellow } }) => yellow};
      }
    }
  }

  .part-name {
    width: calc(100% - 6rem);
    padding: 0.5rem;
    margin-bottom: 0;

    font-size: 1.5rem;

    border-radius: 3px;
    border: 3px solid transparent;
    outline: none;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    transition: border 0.15s ease-in-out;
    box-sizing: border-box;

    &:focus {
      border: 3px solid ${({ theme: { yellow } }) => yellow};
    }
  }
`;
