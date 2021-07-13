import styled from 'styled-components';

const Button = styled.button`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 70px;

  border-radius: 2px;
  padding: 0 1.25rem;

  font-family: 'Roboto-Bold', sans-serif;
  font-size: 0.9rem;
  background: ${props => props.theme.orange};
  color: ${props => props.theme.white};

  outline: none;
  border: none;

  box-sizing: border-box;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

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

  span:not(.icon) {
    margin-top: 0.25rem;
    font-size: 0.8rem;
  }
`;

export default Button;
