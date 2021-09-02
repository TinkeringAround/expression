import styled from 'styled-components';

import { SGridTab } from '../../../component/grid/grid-tabs/styled';

export const STemplates = styled(SGridTab)``;

export const STemplate = styled.div`
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

  &:hover,
  &:active {
    color: ${({ theme: { second } }) => second};
    background: ${({ theme: { yellow } }) => yellow};
  }

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
