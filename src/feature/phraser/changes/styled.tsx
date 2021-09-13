import styled from 'styled-components';

import { SGridTabTemplate } from '../../../component/grid/grid-tabs/styled';
import { noScrollbar } from '../../../scrollbar';

export const SChanges = styled(SGridTabTemplate)`
  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    h2 {
      margin: 0 0 0.25rem;
      padding: 0.5rem;

      font-size: 0.8rem;
      font-weight: normal;
      color: ${({ theme: { grey } }) => grey};
      border-radius: 3px;

      cursor: pointer;
      transition: color 0.2s ease-in-out, background 0.2s ease-in-out;

      &:hover {
        color: ${({ theme: { black } }) => black};
        background: ${({ theme: { yellow } }) => yellow};
      }
    }

    hr {
      width: 80%;
      height: 1px;
      margin: 0 0 0.5rem;

      background: ${({ theme: { light } }) => light};
      border: none;
    }

    &:last-of-type {
      hr {
        display: none;
      }
    }
  }

  ${noScrollbar};
`;
