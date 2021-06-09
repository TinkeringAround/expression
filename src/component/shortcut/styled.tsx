import styled from 'styled-components';

export const SShortcut = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: none;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  margin: 0;

  background: ${props => props.theme.hexToRgbA(props.theme.white, '0.7')};

  &.show {
    display: flex;
  }

  kbd {
    padding: 3px 8px;

    font-size: 0.9em;
    font-weight: bold;
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.light};
    white-space: nowrap;

    border-radius: 3px;
    border: 1px solid ${props => props.theme.grey};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
  }

  span {
    display: block;

    margin: 0 0.15rem;

    font-size: 0.75rem;
    color: ${props => props.theme.black};
  }
`;
