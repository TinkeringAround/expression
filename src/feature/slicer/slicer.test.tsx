import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import * as utils from '../../util';
import Slicer from '.';

describe('Slicer', () => {
  const slicerWithBrowser = (
    <BrowserRouter>
      <Slicer />
    </BrowserRouter>
  );

  beforeAll(() => {
    jest.spyOn(utils, 'getElectron').mockReturnValue({
      trigger: jest.fn(),
      dispatch: jest.fn(),
      on: () => {},
      isDev: false
    });
  });

  test('should load', () => {
    render(slicerWithBrowser);
  });
});
