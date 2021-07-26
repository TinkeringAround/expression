import { DraggableLocation } from 'react-beautiful-dnd';

export enum Pattern {
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

export interface Part {
  id: string;
  pattern: keyof Pattern;
  lines: string[];
}

export interface HasCollectionId {
  collectionId: string;
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
