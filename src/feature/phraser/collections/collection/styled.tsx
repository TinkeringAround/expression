import styled from 'styled-components';

export const SCollection = styled.div`
  width: 100%;

  border-left: solid 0 transparent;

  transition: border-left 0.15s ease-in-out, background 0.15s ease-in-out;
  box-sizing: border-box;

  &.expanded {
    border-left: solid 15px ${({ theme: { yellow } }) => yellow};
    background: ${({ theme: { light } }) => light};
  }

  .head {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    height: 80px;
    padding: 0 0.25rem;

    transition: all 0.15s ease-in-out;
    box-sizing: border-box;
    cursor: pointer;

    .title {
      width: calc(100% - 70px);
      margin: 0;
      padding: 0.5rem 1rem;

      font-family: 'Roboto-Bold', sans-serif;
      font-size: 1rem;

      background: transparent;
      border: none;
      border-radius: 3px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      outline: none;
      transition: all 0.15s ease-in-out;
      box-sizing: border-box;

      &:hover {
        color: ${({ theme: { second } }) => second};
        background: ${({ theme: { light } }) => light};
      }
    }

    .icon {
      width: 35px;

      font-size: 1.25rem;

      opacity: 0;
      cursor: pointer;
      transition: opacity 0.15s ease-in-out 0.15s, color 0.15s ease-in-out;

      &:hover {
        color: ${({ theme: { light } }) => light};
      }
    }

    &:hover {
      color: ${({ theme: { second } }) => second};
      background: ${({ theme: { yellow } }) => yellow};

      .icon {
        opacity: 1;
      }
    }
  }

  footer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    height: 40px;

    box-sizing: border-box;

    > button {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 40px;
      padding: 0 1rem;

      color: ${({ theme: { grey } }) => grey};
      font-size: 0.8rem;
      border: none;
      outline: none;

      box-sizing: border-box;
      cursor: pointer;
      transition: color 0.15s ease-in-out;

      &:hover {
        color: ${({ theme: { black } }) => black};
      }
    }
  }
`;
