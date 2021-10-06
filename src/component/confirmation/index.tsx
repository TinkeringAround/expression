import React, { FC } from 'react';

import { anyFunction } from '../../lib/util';

import Button from '../button';
import Icon from '../icon';
import Dialog from '../dialog';

import { SConfirmation } from './styled';

interface Props {
  visible: boolean;
  content: string;
  onConfirmation: anyFunction;
  onCancel: anyFunction;
}

const Confirmation: FC<Props> = ({ visible, content, onConfirmation, onCancel }) => (
  <Dialog visible={visible}>
    <SConfirmation>
      <Icon iconType="cross" title="Cancel" onClick={onCancel} />
      <p>{content}</p>
      <Button onClick={onConfirmation}>Confirm</Button>
    </SConfirmation>
  </Dialog>
);

export default Confirmation;
