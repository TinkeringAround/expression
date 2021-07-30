import { DraggableLocation } from 'react-beautiful-dnd';

export enum Pattern {
  NONE = '',
  PAAR = 'aabb',
  KREUZ = 'abab'
}

export enum Template {
  SINGLE = 'single',
  DOUBLE = 'double',
  QUADROUPLE = 'quadrouple',
  SEXTUPLE = 'sextuple',
  OCTUPLE = 'octuple'
}

export const TemplateDescriptions = {
  [Template.SINGLE]: '1x4 Lines',
  [Template.DOUBLE]: '2x4 Lines',
  [Template.QUADROUPLE]: '4x4 Lines',
  [Template.SEXTUPLE]: '6x4 Lines',
  [Template.OCTUPLE]: '8x4 Lines'
};

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
  lines: string[];
}

export interface HighlightedLine {
  text: string;
  color?: string;
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

export interface HasSource {
  source: DraggableLocation;
}

export interface HasDestination {
  destination: DraggableLocation;
}

export interface SourceDestination extends HasSource, HasDestination {}

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

export interface AddPhraserSongPartRhymePayload extends HasDestination {
  template: Template;
}

export interface ReorderPhraserSongPartRhymePayload extends SourceDestination {}

export interface MovePhraserSongPartRhymePayload extends SourceDestination {}
