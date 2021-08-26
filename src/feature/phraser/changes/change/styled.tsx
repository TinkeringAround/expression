import styled from 'styled-components';

export const SChange = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 90%;
  padding: 0.5rem 0;

  box-sizing: border-box;
  border-radius: 3px;

  transition: background 0.15s ease-in-out;

  .icon {
    flex: 2;

    font-size: 0.8rem;
  }

  &.blue > .icon {
    color: ${({ theme: { blue } }) => blue};
  }

  &.green > .icon {
    color: ${({ theme: { green } }) => green};
  }

  &.red > .icon {
    color: ${({ theme: { red } }) => red};
  }

  &.yellow > .icon {
    color: ${({ theme: { yellow } }) => yellow};
  }

  &:hover {
    background: ${({ theme: { light } }) => light};
  }

  span {
    display: flex;
    align-items: center;
    flex: 10;

    width: 90%;
    color: ${({ theme: { grey } }) => grey};

    text-transform: capitalize;

    b {
      margin-left: 0.5rem;

      font-size: 1.25rem;
      color: ${({ theme: { black } }) => black};
    }
  }
`;
