import styled from 'styled-components';

export const SDropZone = styled.aside`
  display: flex;

  height: 100%;

  background: ${props => props.theme.white};

  transition: all 0.1s ease-in-out;

  border-right: 3px solid ${props => props.theme.light};
  box-sizing: border-box;

  outline: none;

  &:hover {
    border-right: 3px solid ${props => props.theme.yellow};
  }

  .resizable {
    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: border-box;
    transition: background 0.15s ease-in-out 0.1s;

    &:active {
      background: ${props => props.theme.hexToRgbA(props.theme.light, '0.25')};
    }

    & > * {
      box-sizing: border-box;
    }
  }
`;

export const SResizableOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background: ${props => props.theme.hexToRgbA(props.theme.yellow, '0.5')};
  z-index: 5;
`;

export const SDropZoneFiles = styled.div`
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

export const SAudioInput = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 70px;
  width: 80%;

  margin-bottom: 2rem;
  border-radius: 2px;

  font-family: 'Roboto-Bold', sans-serif;
  font-size: 0.9rem;
  background: ${props => props.theme.yellow};

  box-sizing: border-box;
  transition: background 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.hexToRgbA(props.theme.yellow, '0.7')};
  }

  .icon {
    font-size: 1.25rem;
    margin-right: 0.75rem;
  }
`;
