import styled from 'styled-components';

export const SDropzone = styled.aside`
  display: flex;

  height: 100%;

  background: ${props => props.theme.blue};

  transition: all 0.1s ease-in-out;

  border-right: 3px solid transparent;
  box-sizing: border-box;

  outline: none;

  &:hover {
    border-right: 3px solid ${props => props.theme.light};
  }

  .resizable {
    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: border-box;

    & > * {
      box-sizing: border-box;
    }

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;

      background: ${props => props.theme.light10};
    }

    .audioFiles {
      width: 90%;
      height: 100%;

      margin-top: 2rem;
      margin-bottom: 2rem;

      overflow: hidden auto;
      cursor: pointer;

      .file {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        width: 100%;
        height: 50px;

        padding: 0.5rem;

        background: ${props => props.theme.light};

        border-radius: 0.25rem;

        box-sizing: border-box;
        transition: background 0.15s ease-in-out;

        &:hover {
          background: ${props => props.theme.yellowLight};
        }

        &:not(:last-child) {
          margin-bottom: 1rem;
        }

        &.selected {
          background: ${props => props.theme.yellow};
        }

        .name {
          display: flex;

          width: 100%;
          margin: 0;

          font-size: 0.8rem;
          font-weight: bold;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .size {
          display: flex;
          width: 80%;

          font-size: 0.7rem;
        }
      }
    }

    .audioInput {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 60px;
      width: 80%;

      margin-bottom: 2rem;
      border-radius: 0.25rem;

      background: ${props => props.theme.main};

      box-sizing: border-box;
      transition: background 0.15s ease-in-out;
      cursor: pointer;

      &:hover {
        background: ${props => props.theme.yellowLight};
      }
    }
  }
`;
