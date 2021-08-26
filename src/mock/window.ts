import { anyFunction } from '../lib/util';
import { DropResult } from 'react-beautiful-dnd';

export const mockResizeObserver = () => {
  const observe = jest.fn(),
    unobserve = jest.fn(),
    disconnect = jest.fn();

  /**
   * Trigger for testing purpose only
   */
  const triggerResizeEventOnce = (entries?: any[]) => {
    ResizeObserver._callback(entries ?? ResizeObserver.defaultEntries);
  };

  class ResizeObserver {
    static _callback: anyFunction;

    public static defaultWidth = 500;
    public static defaultHeight = 600;
    public static defaultInlineAddition = 50;

    public static defaultEntries = [
      {
        contentRect: {
          width: ResizeObserver.defaultWidth,
          height: ResizeObserver.defaultHeight
        },
        borderBoxSize: [
          {
            inlineSize: ResizeObserver.defaultWidth + ResizeObserver.defaultInlineAddition,
            blockSize: ResizeObserver.defaultHeight + ResizeObserver.defaultInlineAddition
          }
        ]
      }
    ];

    constructor(callback: anyFunction) {
      ResizeObserver._callback = callback;
    }

    observe() {
      observe();
    }

    unobserve() {
      unobserve();
    }

    disconnect() {
      disconnect();
    }
  }

  window.ResizeObserver = ResizeObserver;

  return {
    observe,
    unobserve,
    disconnect,
    triggerResizeEventOnce,
    defaults: {
      width: ResizeObserver.defaultWidth,
      height: ResizeObserver.defaultHeight,
      inlineSize: ResizeObserver.defaultWidth + ResizeObserver.defaultInlineAddition,
      blockSize: ResizeObserver.defaultHeight + ResizeObserver.defaultInlineAddition
    }
  };
};

export const mockClipBoard = (resolve: boolean = true) => {
  const writeTextMock = jest.fn();
  writeTextMock.mockImplementation(() => {
    return resolve ? Promise.resolve() : Promise.reject();
  });

  if (!window.navigator) {
    Object.defineProperty(window, 'navigator', {
      configurable: true,
      value: {
        clipboard: {
          writeText: writeTextMock
        }
      }
    });
  } else {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });
  }

  return { writeText: writeTextMock };
};

export const getDropResultMock = (dropResult?: Partial<DropResult>): DropResult => ({
  mode: 'FLUID',
  type: 'DEFAULT',
  reason: 'DROP',
  draggableId: '',
  source: { droppableId: '1', index: 0 }, // id must be 'collection'
  destination: { droppableId: '2', index: 0 }, // id must be 'collection'
  ...dropResult
});
