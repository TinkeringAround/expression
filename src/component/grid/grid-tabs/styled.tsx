import styled from 'styled-components';

import { fadeIn, scaleUpDown } from '../../../animations';

export const SGridTabs = styled.aside<{ expanded: boolean }>`
  position: relative;

  width: ${({ expanded }) => (expanded ? '350px' : '2rem')};
  height: 100%;

  background: ${({ theme: { light } }) => light};
  color: ${({ theme: { black } }) => black};

  border-right: solid 10px ${({ theme: { yellow } }) => yellow};

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
  position: relative;

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

  > .count {
    position: absolute;
    top: -0.5rem;
    left: -0.75rem;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 1.5rem;
    width: 1.5rem;

    writing-mode: lr;
    text-orientation: mixed;
    text-align: center;
    font-size: 0.6rem;
    font-weight: bold;
    color: ${({ theme: { white } }) => white};
    background: ${({ theme: { green } }) => green};

    border-radius: 1rem;
    box-shadow: 3px 2px 3px rgb(0 0 0 / 15%);

    animation: fadeIn 0.2s ease-in-out, scaleUpDown 2s ease-in-out infinite;

    ${fadeIn};
    ${scaleUpDown};
  }

  &:not(:last-of-type) {
    margin-bottom: 0.75rem;
  }

  &:hover {
    background: ${({ theme: { hexToRgbA, yellow } }) => hexToRgbA(yellow, '0.7')};
  }

  ${({ active, theme: { hexToRgbA, orange } }) =>
    active &&
    ` background: ${orange}; 
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

  background: ${({ theme: { white } }) => white};

  box-sizing: border-box;
  animation: fadeIn 0.35s ease-in-out;

  ${fadeIn};
`;
