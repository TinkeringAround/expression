import styled from 'styled-components';

export const SDropZoneFile = styled.div`
  display: flex;
  justify-content: space-evenly;

  width: 100%;
  height: 80px;

  padding: 0.5rem 1rem 0.5rem 0;

  border-left: solid 5px transparent;
  box-sizing: border-box;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.second};
    background: ${props => props.theme.yellow};
  }

  &.selected {
    border-left: solid 15px ${props => props.theme.yellow};
    background: ${props => props.theme.light};
  }

  .icon {
    height: 100%;
    width: 80px;

    font-size: 1.75rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: calc(100% - 80px);

    .name {
      width: 100%;
      margin: 0;

      font-family: 'Roboto-Bold', sans-serif;
      font-size: 0.95rem;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .size {
      display: flex;
      width: 80%;

      font-size: 0.85rem;
    }
  }
`;
