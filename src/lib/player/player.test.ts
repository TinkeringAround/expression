import { createPlayer } from './index';

describe('player', () => {
  describe('createPlayer', () => {
    test('should create player without options', () => {
      const player = createPlayer();

      expect(player).not.toBeNull();
      expect(player.state).toBe('stopped');
    });
  });
});
