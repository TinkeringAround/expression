import styled from 'styled-components';
import { SGridTabItemTemplate, SGridTabTemplate } from '../../../component/grid/grid-tabs/styled';

export const SLibrary = styled(SGridTabTemplate)``;

export const SLibrarySuggestion = styled(SGridTabItemTemplate)`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80%;
  padding: 1.25rem 1.25rem;

  &:hover,
  :active {
    .icon {
      opacity: 1;

      color: ${({ theme: { black } }) => black};
    }
  }
  
  p {
    width: 100%;
    margin: 0.25rem 0 0;

    font-size: 0.8rem;
    text-align: start;
    color: ${({ theme: { second } }) => second};

    span {
      display: block;

      &:not(:first-of-type) {
        margin-top: 0.5rem;
      }
    }
  }

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;