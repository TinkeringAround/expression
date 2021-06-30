import { Player, PlayerOptions } from 'tone';

/**
 * Creates a new Player instance and syncs it to the Transport Layer
 * @param {Partial<PlayerOptions>} options player options
 * @returns {Player} the synced player
 */
export const createPlayer = (options?: Partial<PlayerOptions>): Player =>
  new Player(options).toDestination().sync();
