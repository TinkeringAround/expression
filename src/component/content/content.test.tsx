import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Content from '.';

describe('Content', () => {
  test('render fixed to top"', async () => {
    const { container } = render(<Content />);

    const content = container.children[0];
    expect(content).toHaveStyle('position: fixed');
    expect(content).toHaveStyle('top: 70px');
  });

  test('render children"', async () => {
    render(
      <Content>
        <span>Test</span>
      </Content>
    );

    expect(screen.findByText('Test')).toBeTruthy();
  });

  test('applying flex, width, height and animation to children"', () => {
    render(
      <Content>
        <button>Test</button>
      </Content>
    );

    const button = document.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle('display: flex');
    expect(button).toHaveStyle('width: inherit');
    expect(button).toHaveStyle('height: inherit');
    expect(button).toHaveStyle(`animation: fadeIn 1s ease-in-out`);
  });
});
