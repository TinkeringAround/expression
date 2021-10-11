import React, { FC, Fragment } from 'react';

import { usePhraser } from '../../store/phraser';

import If from '../if';
import Karaoke from './karaoke';

const Modals: FC = () => {
  const { karaoke } = usePhraser();

  return (
    <Fragment>
      <If condition={karaoke}>
        <Karaoke />
      </If>
    </Fragment>
  );
};

export default Modals;
