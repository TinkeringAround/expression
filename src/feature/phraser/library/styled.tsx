import styled from 'styled-components';
import { SGridTabTemplate } from '../../../component/grid/grid-tabs/styled';

export const SLibrary = styled(SGridTabTemplate)``;

export const SLibrarySuggestion = styled.div`
  flex-direction: column;

  width: 70%;
  padding: 1.25rem 1.25rem;

  background: ${({ theme: { light } }) => light};
  border-radius: 3px;

  h2 {
    margin: 0;

    font-size: 1rem;
  }

  span {
    display: block;

    width: 100%;
    padding: 0.25rem 0.5rem;
    margin-top: 0.25rem;

    font-size: 0.9rem;
    border-radius: 3px;

    box-sizing: border-box;
    transition: color 0.15s ease-in-out, background 0.15s ease-in-out;

    &:first-of-type {
      margin-top: 0.5rem;
    }

    &:hover {
      background: ${({ theme: { yellow } }) => yellow};
      color: ${({ theme: { white } }) => white};
    }
  }

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;
