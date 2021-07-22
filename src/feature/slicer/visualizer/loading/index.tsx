import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { delay } from '../../../../lib/util';
import { useSlicer } from '../../../../store/slicer';
import { selectSlicerIsProcessing } from '../../../../store/slicer/selector';

import Spinner from '../../../../component/spinner';

const SLoading = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background: white;

  opacity: ${({ visible }) => (visible ? '1' : '0')};

  transition: opacity 0.1s ease-in-out, z-index 0.1s ease-in-out;

  z-index: ${({ visible }) => (visible ? 20 : -1)};
`;

const Loading: FC = () => {
  const isProcessing = useSlicer(selectSlicerIsProcessing);

  const [show, setShow] = useState<boolean>(isProcessing);

  useEffect(() => {
    if (isProcessing) setShow(true);
    else {
      delay(() => {
        setShow(false);
      }, 1000);
    }
  }, [isProcessing, setShow]);

  return (
    <SLoading role="loading" visible={show}>
      <Spinner />
    </SLoading>
  );
};

export default Loading;
