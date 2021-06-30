import { createPlayer } from './index';

describe('player', () => {
  describe('createPlayer', () => {
    test('should create player without options', () => {
      const player = createPlayer();

      expect(player).not.toBeNull();
    });

    test('should create player with options', () => {
      const player = createPlayer({ loop: true, loopStart: 1, loopEnd: 2 });

      expect(player).not.toBeNull();
      expect(player.loop).toBeTruthy();
      expect(player.loopStart).toBe(1);
      expect(player.loopEnd).toBe(2);
    });
  });
});
