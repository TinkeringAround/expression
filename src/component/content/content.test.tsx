import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Content from '.';

test('render fixed to top"', async () => {
  const { container } = render(<Content />);

  const { position, top } = getComputedStyle(container.children[0]);
  expect(position).toEqual('fixed');
  expect(top).toEqual('70px');
});

test('render children"', async () => {
  const { container } = render(
    <Content>
      <span>Test</span>
    </Content>
  );

  expect(container.children.length).toEqual(1);
  expect(screen.findByText('Test')).toBeTruthy();
});

test('applying animation to children"', async () => {
  const { container } = render(
    <Content>
      <button>Test</button>
    </Content>
  );

  const { animation } = getComputedStyle(container.children[0].children[0]);
  expect(animation).not.toBeNull();
});
