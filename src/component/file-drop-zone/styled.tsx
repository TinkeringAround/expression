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
    transition: background 0.15s ease-in-out 0.1s;

    &:active {
      background: ${props => props.theme.light10};
    }

    & > * {
      box-sizing: border-box;
    }
  }
`;

export const SOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background: ${props => props.theme.light10};
  z-index: 5;
`;

export const SAudioFiles = styled.div`
  width: 100%;
  height: 100%;

  margin-top: 1rem;

  overflow: hidden auto;

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar {
    width: 0;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

export const SAudioFile = styled.div`
  display: flex;
  justify-content: space-evenly;

  width: 100%;
  height: 80px;

  padding: 0.5rem 1rem 0.5rem 0;

  color: ${props => props.theme.light};

  border-left: solid 5px transparent;
  box-sizing: border-box;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.second};
    background: ${props => props.theme.yellowLight};
  }

  &.selected {
    border-left: solid 5px ${props => props.theme.yellow};
    color: ${props => props.theme.blue};
    background: ${props => props.theme.yellowLight};
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

export const SAudioInput = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 80px;
  width: 80%;

  margin-bottom: 2rem;
  border-radius: 2px;

  font-family: 'Roboto-Bold', sans-serif;
  background: ${props => props.theme.main};

  box-sizing: border-box;
  transition: background 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.yellowLight};
  }

  .icon {
    font-size: 1.75rem;
    margin-right: 0.75rem;
  }
`;
