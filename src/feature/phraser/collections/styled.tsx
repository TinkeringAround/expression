import styled from 'styled-components';

import { noScrollbar } from '../../../scrollbar';

export const SCollections = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  padding-top: 2rem;
  padding-bottom: calc(4rem + 80px);

  box-sizing: border-box;

  h1 {
    width: 100%;
    margin: 0;
    padding: 0 0 1rem 0;

    font-family: 'Mono', sans-serif;
    font-weight: normal;
    font-size: 1.5rem;
    text-align: center;
  }

  .collections {
    width: 100%;
    height: calc(100% - 3.5rem);

    overflow: hidden auto;

    > *:not(:last-child) {
      margin-bottom: 1rem;
    }

    ${noScrollbar};
  }
`;

export const SCollectionFooter = styled.footer`
  position: absolute;
  bottom: 2rem;
  left: 10%;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 80px;
  width: 80%;

  margin: 0;
  border-radius: 2px;

  font-family: 'Roboto-Bold', sans-serif;
  font-size: 0.9rem;
  background: ${({ theme: { yellow } }) => yellow};

  box-sizing: border-box;
  transition: background 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${({ theme: { hexToRgbA, yellow } }) => hexToRgbA(yellow, '0.7')};
  }
`;
