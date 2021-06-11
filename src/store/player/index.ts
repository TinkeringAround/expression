import create, { State } from 'zustand';
import { Player } from 'tone';

export interface PlayerState extends State {
  readonly player: Player;
  readonly isPlaying: boolean;
  readonly marker: number;
  readonly update: (partial: Partial<PlayerState>) => void;
}

export const usePlayer = create<PlayerState>(set => ({
  player: new Player().toDestination().sync(),
  isPlaying: false,
  marker: 0,
  //@ts-ignore
  update: (partial: Partial<PlayerState>) => set(partial)
}));
