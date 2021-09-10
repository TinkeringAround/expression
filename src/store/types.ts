import { DraggableLocation } from 'react-beautiful-dnd';

export interface HasId {
  readonly id: string;
}

export type Snapshot<T> = Omit<T, 'id' | 'changes'>;

export type HasError = {
  error?: string;
};

export interface HasSource {
  source: DraggableLocation;
}

export interface HasDestination {
  destination: DraggableLocation;
}
