import styled from 'styled-components';

export const SDropZoneFile = styled.div`
  position: relative;

  display: flex;
  justify-content: flex-start;

  width: 100%;
  height: 80px;

  padding: 0.5rem 1rem 0.5rem 0;

  border-left: solid 5px transparent;
  box-sizing: border-box;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${({ theme: { second } }) => second};
    background: ${({ theme: { yellow } }) => yellow};

    .icon[class*='trash'] {
      opacity: 1;
    }
  }

  &.selected {
    border-left: solid 15px ${({ theme: { yellow } }) => yellow};
    background: ${({ theme: { light } }) => light};
  }

  .icon {
    height: 100%;
    width: 50px;

    font-size: 1.75rem;

    &[class*='trash'] {
      position: absolute;
      right: 20px;
      top: 0;

      width: 10px;

      font-size: 1.25rem;
      color: ${({ theme: { black } }) => black};

      opacity: 0;
      transition: opacity 0.3s ease-in-out 0.1s, color 0.2s ease-in-out;

      &:hover {
        color: ${({ theme: { orange } }) => orange};
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: calc(100% - 100px);

    .name {
      width: 100%;
      margin: 0;

      font-family: 'Roboto-Bold', sans-serif;
      font-size: 0.95rem;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
