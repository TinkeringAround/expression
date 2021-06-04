import React, { FC } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useDrag } from './useDrag';

import { mockProperties, unMockProperties } from '../mock/html';

describe('useDrag', () => {
  type Props = {
    minX?: number;
    maxX?: number;
    startX?: number;
    test?: 'onDragStart' | 'onDrag' | 'onDragEnd' | 'onDragPrevent' | 'reset';
    useClick?: boolean;
    useRef?: boolean;
  };

  const UseDrag: FC<Props> = ({
    minX = 0,
    maxX = 100,
    startX = 50,
    test = 'onDragStart',
    useClick = true,
    useRef = true
  }) => {
    const {
      x,
      dragging,
      draggable,
      onDragStart,
      onDragEnd,
      onDrag,
      onDragPrevent,
      reset
    } = useDrag(minX, maxX, startX);

    const propagateEvent = (event: any) => {
      if (test === 'onDragStart') onDragStart(event);
      else if (test === 'onDrag') onDrag(event);
      else if (test === 'onDragEnd') onDragEnd(event);
      else if (test === 'reset') reset();
      else onDragPrevent(event);
    };

    return (
      <div
        role="wrapper"
        ref={useRef ? draggable : null}
        onDrag={event => {
          if (!useClick) propagateEvent(event);
        }}
        onClick={event => {
          if (useClick) propagateEvent(event);
        }}
      >
        <span>{x}</span>
        <span>{`${dragging}`}</span>
      </div>
    );
  };

  const startDrag = (options = { button: 0, pageX: 0 }) => {
    // mock dragStart via click
    fireEvent.click(screen.getByRole('wrapper'), options);
  };

  const drag = (options = { clientX: 100 }) => {
    // mock drag via click
    fireEvent.click(screen.getByRole('wrapper'), options);
  };

  const endDrag = () => {
    // mock dragEnd via click
    fireEvent.click(screen.getByRole('wrapper'));
  };

  const reset = () => {
    // mock reset via click
    fireEvent.click(screen.getByRole('wrapper'));
  };

  beforeEach(() => {
    mockProperties('HTML', ['offsetLeft'], [0]);
    mockProperties('MouseEvent', ['pageX'], [0]);
  });

  afterAll(() => {
    unMockProperties('HTML');
    unMockProperties('MouseEvent');
  });

  test('should return correct x', () => {
    render(<UseDrag />);

    expect(screen.getByText('50')).toBeInTheDocument();
  });

  test('should update x when minX is changed and x is less than minX', () => {
    render(<UseDrag minX={50} startX={0} />);

    expect(screen.getByText('50')).toBeInTheDocument();
  });

  test('should update x when maxX is changed and x is greater than maxX', () => {
    render(<UseDrag maxX={50} startX={100} />);

    expect(screen.getByText('50')).toBeInTheDocument();
  });

  test('should update dragging on drag start', async () => {
    render(<UseDrag />);
    expect(screen.queryByText('true')).not.toBeInTheDocument();

    startDrag();

    expect(screen.getByText('true')).toBeInTheDocument();
  });

  test('should not update dragging on drag start when not left mouse button clicked', async () => {
    render(<UseDrag />);

    startDrag({ button: 1, pageX: 0 });

    expect(screen.queryByText('true')).not.toBeInTheDocument();
  });

  test('should not update dragging on drag start when draggable ref is null', async () => {
    render(<UseDrag useRef={false} />);

    startDrag();

    expect(screen.queryByText('true')).not.toBeInTheDocument();
  });

  test('should update x on drag', () => {
    const { rerender } = render(<UseDrag />);

    startDrag();
    rerender(<UseDrag test="onDrag" />);
    drag();

    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('should set x to min when dragged over minX', () => {
    const { rerender } = render(<UseDrag minX={50} startX={100} />);

    startDrag();
    rerender(<UseDrag test="onDrag" minX={50} startX={100} />);
    drag({ clientX: 25 });

    expect(screen.getByText('50')).toBeInTheDocument();
  });

  test('should set x to max when dragged over maxX', () => {
    const { rerender } = render(<UseDrag maxX={75} startX={50} />);

    startDrag();
    rerender(<UseDrag test="onDrag" maxX={75} startX={50} />);
    drag();

    expect(screen.getByText('75')).toBeInTheDocument();
  });

  test('should not update x on drag when dragging is false', () => {
    render(<UseDrag test="onDrag" />);

    drag();

    expect(screen.queryByText('100')).not.toBeInTheDocument();
  });

  test('should update dragging on drag end', () => {
    const { rerender } = render(<UseDrag />);

    startDrag();
    rerender(<UseDrag test="onDragEnd" />);
    endDrag();

    expect(screen.queryByText('true')).not.toBeInTheDocument();
  });

  test('should not update dragging on drag end when dragging is false', () => {
    const { rerender } = render(<UseDrag />);

    rerender(<UseDrag test="onDragEnd" />);
    endDrag();

    expect(screen.queryByText('true')).not.toBeInTheDocument();
  });

  test('should set drop effect on dragPrevent', () => {
    render(<UseDrag test="onDragPrevent" useClick={false} />);

    fireEvent.drag(screen.getByRole('wrapper'), {
      dataTransfer: {
        dropEffect: 'none'
      }
    });
  });

  test('should reset on reset', () => {
    const startX = 40;
    const { rerender } = render(<UseDrag startX={startX} />);

    startDrag();
    rerender(<UseDrag test="reset" startX={startX} />);
    reset();

    expect(screen.queryByText('true')).not.toBeInTheDocument();
    expect(screen.getByText(startX)).toBeInTheDocument();
  });
});
