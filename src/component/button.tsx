import styled from 'styled-components';

const SButton = styled.button`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 70px;

  border-radius: 2px;
  padding: 0 1.5rem;

  font-family: 'Roboto-Bold', sans-serif;
  font-size: 0.9rem;
  background: ${props => props.theme.orange};
  color: ${props => props.theme.white};

  outline: none;
  border: none;

  box-sizing: border-box;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  // automatically apply margin to second child
  // e.g. first child = icon, second child = text
  & > :nth-child(2) {
    margin-left: 0.75rem;
  }

  &[disabled] {
    color: ${props => props.theme.yellow};

    cursor: default;
  }

  &:not([disabled]) {
    :hover {
      background: ${props => props.theme.hexToRgbA(props.theme.orange, '0.7')};
    }
  }

  .icon {
    font-size: 1.25rem;
  }
`;

export default SButton;
