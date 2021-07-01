import { Player } from 'tone';

/**
 * Creates a new Player instance and syncs it to the Transport Layer
 * @returns {Player} the synced player
 */
export const createPlayer = (): Player => new Player().toDestination().sync();
