import { mock } from 'jest-mock-extended';

import * as useDragHook from '../hook/useDrag';
import { DragState } from '../hook/useDrag';

import * as useClientRectHook from '../hook/useClientRect';
import { Rect } from '../hook/useClientRect';

export const mockUseDrag = (defaultValue: number = 500) =>
  jest.spyOn(useDragHook, 'useDrag').mockImplementation((minX: number) => {
    return mock<DragState>({
      x: minX > 0 ? defaultValue : 0,
      draggable: { current: null },
      onDragPrevent: jest.fn(),
      onDragStart: jest.fn(),
      onDrag: jest.fn(),
      onDragEnd: jest.fn()
    });
  });

export const mockUseClientRect = ({ width = 100, height = 100, x = 0, y = 0 }: Partial<Rect>) =>
  jest.spyOn(useClientRectHook, 'useClientRect').mockReturnValue({
    rect: {
      width,
      height,
      x,
      y
    },
    ref: jest.fn()
  });
