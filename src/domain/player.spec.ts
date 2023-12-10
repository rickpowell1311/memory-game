import { Player } from "./player";

describe('Player', () => {

  describe('constructed', () => {
    let player: Player;
    
    beforeEach(async () => {
      player = new Player('test_gamer');
    });

    it('Should have no high score defined', () => {
        expect(player.get_high_score()).not.toBeDefined();
    })
  })

  describe('high score already recorded', () => { 
    let player: Player;

    beforeEach(async () => {
        player = new Player('test_gamer', 5);
    });
    
    it('Should not set a new high score when a lower score is recorded', () => {
        player.record_score(4);
        expect(player.get_high_score()).toBe(5);
    });

    it('Should not change the high score when the same score is recorded', () => {
        player.record_score(5);
        expect(player.get_high_score()).toBe(5);
    });

    it('Should set a new high score when a higher score is recorded', () => {
        player.record_score(6);
        expect(player.get_high_score()).toBe(6);
    });
  })
});