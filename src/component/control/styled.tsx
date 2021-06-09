import styled from 'styled-components';

import SButton from '../button';

export const SControl = styled(SButton)`
  width: 70px;
  padding: 1rem;

  color: ${props => props.theme.black};
  background: ${props => props.theme.yellow};

  &[disabled] {
    color: ${props => props.theme.orange};
  }

  &:not([disabled]) {
    &:hover {
      background: ${props => props.theme.orange};

      .icon {
        color: ${props => props.theme.white};
      }
    }
  }
`;
