import React from 'react';
import { ToneAudioBuffer, Transport } from 'tone';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useSlicer } from '../../../store/slicer';
import { updateSlicerIsPlaying } from '../../../store/slicer/actions';

import SlicerControls from './index';

import { AppMock } from '../../../mock/components';
import { getMockSelection, getSlicerStoreMock } from '../../../mock/store';
import { mockElectronTrigger } from '../../../mock/electron';
import { getAudioFileMock } from '../../../mock/types';
import { getChannelDataMock } from '../../../mock/audio';

describe('SlicerControls', () => {
  const icons = ['first', 'backward', 'play', 'stop', 'foreward', 'last'];
  const SlicerControlsInApp = (
    <AppMock>
      <SlicerControls />
    </AppMock>
  );

  beforeEach(() => {
    useSlicer.setState(getSlicerStoreMock());
    Transport.seconds = 0;
  });

  describe('controls', () => {
    test('should render all slicer relevant icons regardless of selected file', () => {
      render(SlicerControlsInApp);

      icons.every(icon => expect(document.querySelector(`.icon-${icon}`)).toBeInTheDocument());
    });

    test('should render and enable all slicer relevant buttons when selected file is not null', () => {
      render(SlicerControlsInApp);

      const buttons = screen.getAllByRole('button');

      expect(buttons.length).toBe(icons.length);
      buttons.every(button => expect(button).not.toHaveAttribute('disabled'));
    });

    test('should disable all slicer buttons when selected file is null', () => {
      useSlicer.setState(getSlicerStoreMock({ file: null }));
      render(SlicerControlsInApp);

      screen.getAllByRole('button').every(button => expect(button).toHaveAttribute('disabled'));
    });

    describe('onFirst', () => {
      test('should reset seconds to loopStart', () => {
        Transport.seconds = 2; // some value != 0

        render(SlicerControlsInApp);
        fireEvent.keyUp(document, { key: 'ArrowLeft', ctrlKey: true });

        expect(Transport.seconds).toBe(0);
      });
    });

    describe('onBackward', () => {
      test('should set seconds to loopStart when step back would be lower than loopStart', () => {
        const start = 1,
          end = 5;
        Transport.seconds = start + 1;
        useSlicer.setState({ selection: getMockSelection({ start, end }) });

        render(SlicerControlsInApp);
        fireEvent.keyUp(document, { key: 'ArrowLeft' });

        expect(Transport.seconds).toBe(start);
      });

      test('should set seconds to loopStart when step back would be lower than loopStart', () => {
        const start = 1,
          end = 5;
        Transport.seconds = start + 0.5; // - 1 would be lower than start
        useSlicer.setState({ selection: getMockSelection({ start, end }) });

        render(SlicerControlsInApp);
        fireEvent.keyUp(document, { key: 'ArrowLeft' });

        expect(Transport.seconds).toBe(start);
      });
    });

    describe('onPlayPause', () => {
      beforeEach(() => {
        mockElectronTrigger(updateSlicerIsPlaying);
      });

      test('should start Transport', async () => {
        const updateSlicerMock = jest.fn();
        mockElectronTrigger(updateSlicerMock);

        render(SlicerControlsInApp);

        act(() => {
          fireEvent.keyUp(document, { key: ' ' });
        });

        expect(Transport.state).toBe('paused');
        expect(updateSlicerMock).toHaveBeenCalledWith(null, { isPlaying: true });
      });

      test('should pause Transport', async () => {
        const updateSlicerMock = jest.fn();
        mockElectronTrigger(updateSlicerMock);

        render(SlicerControlsInApp);

        act(() => {
          useSlicer.setState({ isPlaying: true });
        });

        await waitFor(() => expect(Transport.state).toBe('started'));

        fireEvent.keyUp(document, { key: ' ' }); // pause

        expect(updateSlicerMock).toHaveBeenCalledWith(null, { isPlaying: false });
      });
    });

    describe('onStop', () => {
      test('should set seconds to loopStart', () => {
        Transport.seconds = 2; // not loopStart === 0

        render(SlicerControlsInApp);
        fireEvent.keyUp(document, { key: ' ' }); // start
        fireEvent.keyUp(document, { key: ' ', ctrlKey: true }); // start

        expect(Transport.seconds).toBe(0);
        expect(Transport.state).toBe('paused');
      });
    });

    describe('onForward', () => {
      test('should increment current seconds by 1', () => {
        const start = 0;
        Transport.seconds = start;

        render(SlicerControlsInApp);
        fireEvent.keyUp(document, { key: 'ArrowRight' });

        expect(Transport.seconds).toBe(start + 1);
      });
    });

    describe('onLast', () => {
      test('should set Transport seconds to almost loopEnd', () => {
        const start = 0,
          end = 5;
        Transport.seconds = 1;
        useSlicer.setState({ selection: getMockSelection({ start, end }) });

        render(SlicerControlsInApp);
        fireEvent.keyUp(document, { key: ' ' }); // start
        fireEvent.keyUp(document, { key: 'ArrowRight', ctrlKey: true });

        expect(Transport.seconds).toBe(end - 0.01);
        expect(Transport.state).toBe('paused');
      });
    });
  });

  describe('Transport', () => {
    test('should init Transport loop properties', () => {
      const start = 1,
        end = 2,
        offset = 2;
      useSlicer.setState({ selection: getMockSelection({ start, end, offset }) });

      render(SlicerControlsInApp);

      expect(Transport.loop).toBeTruthy();
      expect(Transport.loopStart).toBe(start + offset);
      expect(Transport.loopEnd).toBe(end + offset);
    });

    test('should set Transport seconds to loop start when seconds are below loopStart', () => {
      const start = 1;
      useSlicer.setState({ selection: getMockSelection({ start, offset: 0 }) });

      render(SlicerControlsInApp);

      expect(Transport.seconds).toBe(start);
    });

    test('should set Transport seconds to loop end when seconds are higher than loopEnd', () => {
      const end = 1;
      useSlicer.setState({ selection: getMockSelection({ end }) });

      render(SlicerControlsInApp);
      Transport.seconds = 2;

      act(() => useSlicer.setState({ selection: getMockSelection({ end }) }));

      expect(Transport.loopEnd).toBe(end);
      expect(Transport.seconds).toBe(end);
    });
  });

  describe('player', () => {
    test('should init player with startTime without crash', () => {
      Transport.seconds = -1;

      render(SlicerControlsInApp);
    });

    test('should adjust player and set Transport seconds to 0 when started an file changes', () => {
      const newFile = getAudioFileMock({ name: 'vue.wav' });
      Transport.start();
      Transport.seconds = 1;

      render(SlicerControlsInApp);

      act(() => {
        useSlicer.setState({
          file: {
            ...newFile,
            buffer: new ToneAudioBuffer(),
            channelData: [getChannelDataMock(100), getChannelDataMock(100)]
          }
        });
      });

      expect(Transport.seconds).toBe(0);
    });
  });
});
