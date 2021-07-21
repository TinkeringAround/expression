import styled from 'styled-components';

const Button = styled.button`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 70px;

  border-radius: 2px;
  padding: 0 1.25rem;

  font-family: 'Roboto-Bold', sans-serif;
  font-size: 0.9rem;
  background: ${({ theme: { yellow } }) => yellow};
  color: ${({ theme: { black } }) => black};

  outline: none;
  border: none;

  box-sizing: border-box;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &[disabled] {
    background: ${({ theme: { light } }) => light};
    color: ${({ theme: { grey } }) => grey};

    cursor: default;
  }

  &:not([disabled]) {
    :hover {
      background: ${({ theme: { hexToRgbA, yellow } }) => hexToRgbA(yellow, '0.7')};
    }
  }

  .icon {
    font-size: 1.25rem;

    &:not(:last-of-type) {
      margin-right: 0.75rem;
    }
  }

  span:not(.icon) {
    font-size: 0.8rem;
  }
`;

export default Button;
