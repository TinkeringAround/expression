import React, { FC } from 'react';
import styled from 'styled-components';

import Dialog, { HasVisible } from '../../../../component/dialog';
import Spinner from '../../../../component/spinner';

const SExportingOverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 200px;

  span:last-of-type {
    font-size: 1rem;

    margin-top: 1.5rem;
  }
`;

const ExportingOverlay: FC<HasVisible> = ({ visible }) => (
  <Dialog visible={visible}>
    <SExportingOverlayContent>
      <Spinner />
      <span>Exporting...</span>
    </SExportingOverlayContent>
  </Dialog>
);

export default ExportingOverlay;
