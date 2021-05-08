import styled from 'styled-components';

export const SDropzone = styled.aside`
  display: flex;

  height: 100%;

  background: ${props => props.theme.blue};

  transition: all 0.1s ease-in-out;

  border-right: 3px solid transparent;
  box-sizing: border-box;

  &.isDragging {
    background: ${props => props.theme.light10};
  }

  &:hover {
    background: ${props => props.theme.light10};
    border-right: 3px solid ${props => props.theme.light};
  }

  .resizable {
    display: flex;
    flex-direction: column;

    padding: 1rem;
    box-sizing: border-box;

    outline: none;
  }

  .audioFiles {
    width: 100%;
    height: 100%;

    overflow: hidden auto;
  }

  .audioInput {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 80px;
    width: 100%;

    border-radius: 0.25rem;

    background: ${props => props.theme.main};

    transition: background 0.15s ease-in-out;
    cursor: pointer;

    &:hover {
      background: ${props => props.theme.yellowLight};
    }
  }
`;
