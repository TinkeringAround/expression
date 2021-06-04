import { mock } from 'jest-mock-extended';

import * as useDragHook from '../hook/useDrag';
import { DragState } from '../hook/useDrag';

import * as useClientRectHook from '../hook/useClientRect';

import * as ReactDropZone from 'react-dropzone';

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

export const mockUseClientRect = ({
  width = 100,
  height = 100,
  x = 0,
  y = 0
}: Partial<DOMRectReadOnly>) =>
  jest.spyOn(useClientRectHook, 'useClientRect').mockReturnValue({
    rect: mock<DOMRectReadOnly>({
      width,
      height,
      x,
      y
    })
  });

export const mockReactDropZone = () =>
  jest.spyOn(ReactDropZone, 'useDropzone').mockReturnValueOnce(
    mock<ReactDropZone.DropzoneState>({
      getRootProps: jest.fn(),
      getInputProps: jest.fn(),
      open: jest.fn(),
      isDragActive: true
    })
  );
