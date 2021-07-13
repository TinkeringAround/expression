import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { fadeIn, fromTop } from '../../animations';
import { delay } from '../../lib/util';

const SOverlay = styled.div<HasVisible>`
  position: absolute;
  top: 30%;
  left: 30%;

  height: 40%;
  width: 40%;

  z-index: ${({ visible }) => (visible ? 100 : -1)};

  .content {
    position: relative;

    width: 100%;
    height: 100%;

    background: ${({ theme }) => theme.white};

    border-radius: 3px;

    z-index: ${({ visible }) => (visible ? 101 : -1)};

    animation: fromTop 0.5s ease-in-out, fadeIn 0.5s ease-in-out;

    ${fromTop('-5rem', '0rem')}
    ${fadeIn()}
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    overflow: hidden;

    background: ${({ theme }) => theme.hexToRgbA(theme.black, '0.75')};

    animation: fadeIn 0.5s ease-in-out;

    ${fadeIn()}
  }
`;

export interface HasVisible {
  visible: boolean;
}

const Overlay: FC<HasVisible> = ({ visible, children }) => {
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
    <SOverlay visible={show}>
      {show && <div className="content">{children}</div>}
      {show && <div className="background" />}
    </SOverlay>
  );
};

export default Overlay;
