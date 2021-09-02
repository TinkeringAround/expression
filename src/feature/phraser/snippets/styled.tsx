import styled from 'styled-components';

import { SGridTab } from '../../../component/grid/grid-tabs/styled';
import { noScrollbar } from '../../../scrollbar';

export const SSnippets = styled(SGridTab)`
  ${noScrollbar};
`;

export const SSnippet = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80%;
  padding: 1rem 0.5rem;

  background: ${({ theme: { light } }) => light};
  border-radius: 3px;

  box-sizing: border-box;
  transition: color 0.15s ease-in-out, background 0.15s ease-in-out;

  &:hover {
    color: ${({ theme: { second } }) => second};
    background: ${({ theme: { yellow } }) => yellow};

    .icon {
      opacity: 1;
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
