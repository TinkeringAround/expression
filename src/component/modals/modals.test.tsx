import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { usePhraser } from '../../store/phraser';
import { KARAOKE_MODAL } from './karaoke';

import Modals from './index';

import { AppMock } from '../../mock/components';

describe('Modals', () => {
  const karaokeModalQuery = `#${KARAOKE_MODAL}`;
  const ModalsInApp = (
    <AppMock>
      <Modals />
    </AppMock>
  );

  test('should render nothing when no render condition is met', () => {
    render(ModalsInApp);

    expect(document.querySelector(karaokeModalQuery)).toBeNull();
  });

  test('should render karaoke modal when karaoke is true', () => {
    usePhraser.setState({ karaoke: true });
    render(ModalsInApp);

    expect(document.querySelector(karaokeModalQuery)).toBeInTheDocument();
  });
});
