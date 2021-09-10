import styled from 'styled-components';

import { SGridTab } from '../../../component/grid/grid-tabs/styled';

export const SExport = styled(SGridTab)`
  p {
    text-align: justify;
  }

  button {
    position: absolute;
    bottom: 2rem;
    left: 15%;

    width: 70%;
  }
`;
