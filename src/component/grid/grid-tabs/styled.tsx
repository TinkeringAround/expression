import styled from 'styled-components';

import { fadeIn, scaleUpDown } from '../../../animations';
import { noScrollbar } from '../../../scrollbar';

export const SGridTabs = styled.aside<{ expanded: boolean }>`
  position: relative;

  width: ${({ expanded }) => (expanded ? '25%' : '2rem')};
  max-width: 425px;
  min-width: 2rem;
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

export const SGridTabIndicator = styled.span<{ active: boolean }>`
  position: relative;
  right: 0;

  display: flex;
  align-items: center;

  width: 100%;
  padding: 1.5rem 0;

  font-size: 0.8rem;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  background: ${({ theme: { yellow } }) => yellow};

  border-radius: 5px 0 0 5px;

  transition: background 0.15s ease-in-out, width 0.15s ease-in-out, right 0.15s ease-in-out;
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

  ${({ active, theme: { hexToRgbA, orange, white } }) =>
    active &&
    ` 
      width: calc(100% + 0.5rem);
      right: 0.5rem;
      
      background: ${orange};
      color: ${white};
      font-weight: bold;
      
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

export const SGridTabTemplate = styled.section`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 0 0 1rem 0;

  background: ${({ theme: { white } }) => white};

  box-sizing: border-box;
  overflow: hidden auto;

  ${noScrollbar};

  h1 {
    position: sticky;
    top: 0;
    left: 0;

    width: 100%;
    margin: 0;
    padding: 2rem 0 1rem 0;

    font-family: 'Mono', sans-serif;
    font-weight: normal;
    font-size: 1.5rem;
    text-align: center;
    background: ${({ theme: { white } }) => white};
  }

  .controls {
    display: flex;
    justify-content: flex-end;

    width: 85%;

    margin-bottom: 1.5rem;

    > button {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 2rem;
      width: 2rem;

      color: ${({ theme: { black } }) => black};
      border-radius: 3px;
      outline: none;
      border: none;

      transition: background 0.15s ease-in-out;
      cursor: pointer;

      .icon {
        cursor: pointer;
      }

      &:hover:not(:disabled) {
        background: ${({ theme: { yellow } }) => yellow};
      }

      &:not(:first-of-type) {
        margin-left: 0.25rem;
      }
    }
  }

  > p {
    width: 85%;
    margin: 0 0 2rem;

    font-size: 0.9rem;
    text-align: center;
    line-height: 1.5;
    color: ${({ theme: { darkGrey } }) => darkGrey};
  }

  > .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    min-height: 70%;

    overflow: hidden auto;

    ::-webkit-scrollbar-track {
      display: none;
    }

    ::-webkit-scrollbar {
      width: 15px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme: { yellow } }) => yellow};
      border-right: transparent solid 5px;

      background-clip: padding-box;

      &:hover {
        background-color: ${({ theme: { hexToRgbA, yellow } }) => hexToRgbA(yellow, '0.8')};
      }
    }
  }
`;

export const SGridTabItemTemplate = styled.div`
  position: relative;

  display: flex;

  background: ${({ theme: { light } }) => light};
  border-radius: 3px;
  box-shadow: rgb(206 206 206) 2px 2px 3px 0;

  box-sizing: border-box;
  transition: color 0.2s ease-in-out, background 0.2s ease-in-out;

  &:hover,
  &:active {
    color: ${({ theme: { white } }) => white};
    background: ${({ theme: { yellow } }) => yellow};
  }
`;
