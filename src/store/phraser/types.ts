import { DraggableLocation } from 'react-beautiful-dnd';

export enum Pattern {
  NONE = '',
  PAAR = 'aabb',
  KREUZ = 'abab'
}

export interface MusicCollection {
  id: string;
  title: string;
  songs: Song[];
}

export interface Song {
  id: string;
  title: string;
  parts: Part[];
}

export interface EditableSong extends Song, HasDirty {}

export interface Part {
  id: string;
  name: string;
  rhymes: Rhyme[];
}

export interface Rhyme {
  id: string;
  pattern: Pattern;
  lines: string[];
}

export interface HasDirty {
  dirty: boolean;
}

export interface HasCollectionId {
  collectionId: string;
}

export interface HasPartId {
  partId: string;
}

export interface SourceDestination {
  source: DraggableLocation;
  destination: DraggableLocation;
}

export interface ReorderPhraserCollectionRecipe extends SourceDestination {}

export interface DeletePhraserCollectionPayload extends HasCollectionId {}

export interface UpdatePhraserCollectionTitlePayload extends HasCollectionId {
  title: string;
}

export interface ReorderPhraserCollectionSongsPayload extends SourceDestination, HasCollectionId {}

export interface MovePhraserCollectionSongPayload extends SourceDestination {}

export interface AddPhraserCollectionSongPayload extends HasCollectionId {}

export interface SelectPhraserSongPayload {
  song: Song;
}

export interface DeletePhraserSongPayload extends SelectPhraserSongPayload {}

export interface UpdatePhraserSongTitlePayload extends Pick<Song, 'title'> {}

export interface DeletePhraserSongPartPayload extends HasPartId {}

export interface UpdatePhraserSongPartNamePayload extends HasPartId {
  name: string;
}

export interface ReorderPhraserSongPartRhymePayload extends SourceDestination {}

export interface MovePhraserSongPartRhymePayload extends SourceDestination {}
