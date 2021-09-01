import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { MusicCollection } from '../../../../store/phraser/types';

import Collection from './index';

import { AppMock, DragDropDroppableWrapper } from '../../../../mock/components';
import { getCollectionMock } from '../../../../mock/phraser';
import { mockElectronTrigger } from '../../../../mock/electron';

describe('Collection', () => {
  const collection = getCollectionMock();
  const CollectionInApp = (collection: MusicCollection, index: number = 0) => (
    <AppMock>
      <DragDropDroppableWrapper>
        <Collection collection={collection} index={index} />
      </DragDropDroppableWrapper>
    </AppMock>
  );

  it('should render collection name and toggle and expand button when not expanded', () => {
    render(CollectionInApp(collection));

    const toggleButton = document.querySelector('.icon-arrow-double-down');
    const deleteButton = document.querySelector('.icon-trash');

    expect(toggleButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(screen.getByTitle(collection.title)).toBeInTheDocument();
  });

  it('should omit click when clicked on input', () => {
    render(CollectionInApp(collection));

    act(() => {
      fireEvent.click(screen.getByRole('textbox'));
    });
  });

  it('should expand collection when click on expand icon and show collection songs and add song button', () => {
    render(CollectionInApp(collection));

    act(() => {
      fireEvent.click(screen.getByTitle(/Toggle/));
    });

    collection.songs.every(song => {
      expect(screen.getByText(song.title)).toBeInTheDocument();
    });
    expect(screen.getByText(/Add Song/)).toBeInTheDocument();
  });

  test('should delete collection when clicked on delete icon and confirmation', async () => {
    const deletePhraserCollectionMock = jest.fn();
    mockElectronTrigger(deletePhraserCollectionMock);
    render(CollectionInApp(collection));

    const deleteButton = document.querySelector('.icon-trash');

    if (deleteButton) {
      act(() => {
        fireEvent.click(deleteButton);
      });
    }

    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText('Confirm'));
    });

    await waitFor(() => {
      expect(deletePhraserCollectionMock).toHaveBeenCalledWith(null, {
        collectionId: collection.id
      });
    });
  });

  test('should cancel collection deletion when clicked on delete icon and cancel in confirmation dialog', async () => {
    render(CollectionInApp(collection));

    const deleteButton = document.querySelector('.icon-trash');
    if (deleteButton) {
      act(() => {
        fireEvent.click(deleteButton);
      });
    }

    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByTitle('Cancel'));
    });
  });

  test('should update collection name when input value changes and focus is lost', async () => {
    const title = 'new-title';
    const updatePhraserCollectionTitleMock = jest.fn();
    mockElectronTrigger(updatePhraserCollectionTitleMock);
    render(CollectionInApp(collection));

    const input = screen.getByRole('textbox');

    act(() => {
      fireEvent.change(input, { target: { value: title } });
    });

    await waitFor(() => {
      expect(screen.getByTitle(title)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.blur(input);
    });

    expect(updatePhraserCollectionTitleMock).toHaveBeenCalledWith(null, {
      collectionId: collection.id,
      title
    });
  });

  describe('with expanded collection', () => {
    beforeEach(() => {
      render(CollectionInApp(collection));

      act(() => {
        fireEvent.click(screen.getByTitle(/Toggle/));
      });
    });

    test('should add song to collection when clicked on add song button', () => {
      const addPhraserCollectionSongMock = jest.fn();
      mockElectronTrigger(addPhraserCollectionSongMock);

      fireEvent.click(screen.getByText(/Add Song/));

      expect(addPhraserCollectionSongMock).toHaveBeenCalledWith(null, {
        collectionId: collection.id
      });
    });
  });
});
