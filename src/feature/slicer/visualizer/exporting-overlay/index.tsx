import React, { FC } from 'react';
import styled from 'styled-components';

import Overlay, { HasVisible } from '../../../../component/overlay';
import Spinner from '../../../../component/spinner';

const SExportingOverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  span:last-of-type {
    font-size: 1rem;

    margin-top: 1.5rem;
  }
`;

const ExportingOverlay: FC<HasVisible> = ({ visible }) => (
  <Overlay visible={visible}>
    <SExportingOverlayContent>
      <Spinner />
      <span>Exporting...</span>
    </SExportingOverlayContent>
  </Overlay>
);

export default ExportingOverlay;
