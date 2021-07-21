import styled from 'styled-components';

import Button from '../button';

export const SControl = styled(Button)`
  width: 70px;
  padding: 1rem;

  background: transparent;

  &[disabled] {
    color: ${({ theme: { orange } }) => orange};
    background: transparent;
  }

  &:not([disabled]) {
    &:hover {
      background: ${({ theme: { orange } }) => orange};

      .icon {
        color: ${({ theme: { white } }) => white};
      }
    }
  }
`;
