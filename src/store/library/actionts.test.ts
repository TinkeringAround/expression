import { useLibrary } from './index';
import { getSuggestion } from './actions';

import { mockElectronDispatch } from '../../mock/electron';

describe('Library Actions', () => {
  let dispatchMock: jest.Mock;
  const INITIAL_LIBRARY_STATE = useLibrary.getState();
  const word = 'test';

  beforeEach(() => {
    dispatchMock = jest.fn();
    mockElectronDispatch(dispatchMock);

    useLibrary.setState(INITIAL_LIBRARY_STATE);
  });

  test('should dispatch a suggestion action when word is not in the library yet', () => {
    getSuggestion(word);

    expect(dispatchMock).toHaveBeenCalledWith(null, { word });
  });

  test('should not dispatch suggestion action when word is already in the library', () => {
    useLibrary.setState({
      library: {
        [word]: {
          en: ['test'],
          de: ['Test']
        }
      }
    });

    getSuggestion(word);

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
