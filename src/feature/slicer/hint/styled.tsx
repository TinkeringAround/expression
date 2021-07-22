import styled from 'styled-components';

export const SHint = styled.div`
  position: absolute;
  top: 50%;

  span {
    font-weight: lighter;
    color: ${({ theme: { grey } }) => grey};

    &.icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
  }
`;
