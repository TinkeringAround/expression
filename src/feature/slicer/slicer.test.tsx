import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Slicer from '.';

describe('Slicer', () => {
  const slicerWithBrowser = (
    <BrowserRouter>
      <Slicer />
    </BrowserRouter>
  );

  test('should load', () => {
    render(slicerWithBrowser);
  });
});
