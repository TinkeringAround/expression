import styled from 'styled-components';

import { SGridTabTemplate, SGridTabItemTemplate } from '../../../component/grid/grid-tabs/styled';

export const SSnippets = styled(SGridTabTemplate)``;

export const SSnippet = styled(SGridTabItemTemplate)`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80%;
  padding: 1rem 0.5rem;

  &:hover,
  :active {
    .icon {
      opacity: 1;

      color: ${({ theme: { black } }) => black};
    }
  }

  .icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    font-size: 1rem;

    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }

  p {
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
