import styled from 'styled-components';

import { fadeIn } from '../../../animations';

export const SGridTabs = styled.aside<{ expanded: boolean }>`
  position: relative;

  width: ${({ expanded }) => (expanded ? '350px' : '2rem')};
  height: 100%;

  background: ${({ theme: { light } }) => light};
  color: ${({ theme: { black } }) => black};

  border-right: solid 5px ${({ theme: { yellow } }) => yellow};

  transition: width 0.2s ease-in-out;

  .tabs {
    position: absolute;
    left: 0;
    top: 0.5rem;

    width: 2rem;

    box-sizing: border-box;
  }
`;

export const SGridTab = styled.span<{ active: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 1.5rem 0;

  font-size: 0.8rem;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  background: ${({ theme: { yellow } }) => yellow};

  border-radius: 5px 0 0 5px;

  transition: background 0.15s ease-in-out;
  cursor: pointer;

  &:not(:last-of-type) {
    margin-bottom: 0.15rem;
  }

  &:hover {
    background: ${({ theme: { hexToRgbA, yellow } }) => hexToRgbA(yellow, '0.7')};
  }

  ${({ active, theme: { hexToRgbA, orange } }) =>
    active &&
    `
      background: ${orange}; 
      &:hover {
        background: ${hexToRgbA(orange, '0.7')};
      }`}
`;

export const SGridTabContent = styled.div`
  position: absolute;
  top: 0;
  left: 2rem;

  width: calc(100% - 2rem);
  height: 100%;

  padding: 0.5rem;

  background: ${({ theme: { white } }) => white};

  box-sizing: border-box;
  animation: fadeIn 0.35s ease-in-out;

  ${fadeIn()}
`;
