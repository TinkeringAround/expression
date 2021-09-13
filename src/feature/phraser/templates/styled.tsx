import styled from 'styled-components';

import { SGridTabTemplate, SGridTabItemTemplate } from '../../../component/grid/grid-tabs/styled';

export const STemplates = styled(SGridTabTemplate)``;

export const STemplate = styled(SGridTabItemTemplate)`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80%;
  padding: 1rem 0.5rem;

  h4 {
    margin: 0;
  }

  p {
    margin: 0.25rem 0 0;

    font-size: 0.8rem;
    text-align: center;
    color: ${({ theme: { second } }) => second};
  }

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;
