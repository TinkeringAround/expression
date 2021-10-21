import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useLibrary } from '../../../store/library';
import { LANGUAGES } from '../../../store/library/types';

import Library from './index';

import { AppMock } from '../../../mock/components';
import { mockElectronDispatch } from '../../../mock/electron';

describe('Library', () => {
  const LibraryInApp = (
    <AppMock>
      <Library />
    </AppMock>
  );

  const INITIAL_LIBRARY_STATE = useLibrary.getState();
  const word = 'te';
  const suggestions = {
    en: ['tea'],
    de: ['Tee'],
    fr: ['tee']
  };

  beforeEach(() => {
    useLibrary.setState(INITIAL_LIBRARY_STATE);
  });

  test('should render input control with empty value on init', () => {
    render(LibraryInApp);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.innerHTML).toEqual('');
  });

  test('should search for word suggestions when word of library is typed in search input and then reset when click on reset icon', async () => {
    jest.useFakeTimers();
    useLibrary.setState({
      library: {
        [word]: suggestions
      }
    });

    render(LibraryInApp);

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: word } });
      jest.advanceTimersByTime(500);
    });

    await waitFor(() =>
      [LANGUAGES['en'], LANGUAGES['de'], LANGUAGES['fr']].every(lang => screen.getByText(lang))
    );

    Object.values(suggestions)
      .flat(1)
      .forEach(suggestion => {
        expect(screen.getByText(suggestion)).toBeInTheDocument();
      });

    act(() => {
      const resetIcon = document.querySelector('.icon-cross');
      if (resetIcon) {
        fireEvent.click(resetIcon);
      }

      jest.advanceTimersByTime(500);
    });

    await waitFor(() =>
      [LANGUAGES['en'], LANGUAGES['de'], LANGUAGES['fr']].every(lang => !screen.queryByText(lang))
    );

    Object.values(suggestions)
      .flat(1)
      .forEach(suggestion => {
        expect(screen.queryByText(suggestion)).not.toBeInTheDocument();
      });
  });

  test('should search for word suggestions which is not yet in library', async () => {
    const getSuggestionsMock = jest.fn();
    jest.useFakeTimers();
    mockElectronDispatch(getSuggestionsMock);

    render(LibraryInApp);

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: word } });
      jest.advanceTimersByTime(500);
    });

    await waitFor(() =>
      [LANGUAGES['en'], LANGUAGES['de'], LANGUAGES['fr']].every(lang => !screen.queryByText(lang))
    );

    Object.values(suggestions)
      .flat(1)
      .forEach(suggestion => {
        expect(screen.queryByText(suggestion)).not.toBeInTheDocument();
      });

    expect(getSuggestionsMock).toHaveBeenCalledWith(null, { word });
  });
});
