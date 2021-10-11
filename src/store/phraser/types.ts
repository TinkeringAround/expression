import { HasDestination, HasError, HasId, HasSource, Snapshot } from '../types';

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

export interface MusicCollection extends HasId {
  title: string;
  songs: Song[];
}

export interface Song extends HasId, HasChanges {
  title: string;
  parts: Part[];
}

export interface Part extends HasId {
  name: string;
  rhymes: Rhyme[];
}

export interface Rhyme extends HasId {
  lines: string[];
}

export interface Diff<T> {
  from: T;
  to: T;
}

export type SongChangeAction = 'add' | 'update' | 'remove' | 'reorder' | 'move';

export type SongElementKind = 'title' | 'part' | 'rhyme' | 'line';

export interface SongChange {
  action: SongChangeAction;
  kind: SongElementKind;
  date: string;
  snapshot: Snapshot<Song>;
}

export interface HasChanges {
  changes: SongChange[];
}

export interface HasCollectionId {
  collectionId: string;
}

export interface HasPartId {
  partId: string;
}

export interface HasRhymeId {
  rhymeId: string;
}

export interface SourceDestination extends HasSource, HasDestination {}

export interface PhraserLoadedPayload extends HasError {
  phraser: {
    collections?: MusicCollection[];
  };
}

export interface SetKaraokeModePayload {
  mode: boolean;
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

export interface AddPhraserSongPartRhymePayload extends HasDestination {
  templateId?: string;
  snippetId?: string;
}

export interface UpdatePhraserSongPartRhymePayload extends HasRhymeId {
  line: string;
}

export interface DeletePhraserSongPartRhymePayload extends HasRhymeId {}

export interface ReorderPhraserSongPartRhymePayload extends SourceDestination {}

export interface MovePhraserSongPartRhymePayload extends SourceDestination {}
