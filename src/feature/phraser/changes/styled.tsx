import styled from 'styled-components';

import { SGridTabTemplate } from '../../../component/grid/grid-tabs/styled';
import { noScrollbar } from '../../../scrollbar';

export const SChanges = styled(SGridTabTemplate)`
  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    &:not(:first-of-type) {
      margin-top: 1.5rem;
    }

    h2 {
      margin: 0 0 0.25rem;

      font-size: 0.8rem;
      font-weight: normal;
      color: ${({ theme: { grey } }) => grey};
    }
  }

  ${noScrollbar};
`;
