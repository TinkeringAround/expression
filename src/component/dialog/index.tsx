import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { fadeIn, fadeOut, fromTop } from '../../animations';
import { delay } from '../../lib/util';

import If from '../if';

const SDialog = styled.div<HasVisible & { leaving: boolean }>`
  --height: 450px;

  position: fixed;
  top: 30%;
  left: calc((100% - var(--height)) / 2);

  width: var(--height);
  height: fit-content;
  padding: 2rem;

  box-sizing: border-box;
  z-index: ${({ visible }) => (visible ? 100 : -1)};

  ${({ leaving }) =>
    leaving
      ? `
        > * {
          opacity: 0;
          animation: fadeOut 0.25s ease-in-out !important;
       
          ${fadeOut};
        }`
      : ''};

  .content {
    position: relative;

    width: 100%;
    height: inherit;

    background: ${({ theme: { white } }) => white};

    border-radius: 3px;

    z-index: 101;

    animation: fromTop 0.5s ease-in-out, fadeIn 0.5s ease-in-out;

    ${fromTop('-5rem', '0rem')}
    ${fadeIn};
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    overflow: hidden;

    background: ${({ theme: { hexToRgbA, black } }) => hexToRgbA(black, '0.75')};

    animation: fadeIn 0.5s ease-in-out;

    ${fadeIn};
  }
`;

export interface HasVisible {
  visible: boolean;
}

const Dialog: FC<HasVisible> = ({ visible, children }) => {
  const [show, setShow] = useState<boolean>(visible);

  useEffect(() => {
    if (visible) setShow(true);
    else {
      delay(() => {
        setShow(false);
      }, 1000);
    }
  }, [visible, setShow]);

  return (
    <SDialog visible={show} leaving={!visible && show}>
      <If condition={show}>
        <div className="content">{children}</div>
        <div className="background" />
      </If>
    </SDialog>
  );
};

export default Dialog;
