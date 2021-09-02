export interface HasId {
  readonly id: string;
}

export type Snapshot<T> = Omit<T, 'id' | 'changes'>;

export type HasError = {
  error?: string;
};
