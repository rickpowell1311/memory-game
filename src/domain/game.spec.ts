import { Game, Item } from "./game";
import { newId } from "./id";

describe('Game', () => {

  describe('initialize', () => {
    let game: Game;
    
    beforeEach(async () => {
      game = Game.initialize("test_gamer");
    });

    it('Should have generated items', () => {
        expect(game.getItems()).toBeDefined();
    })
  })

  describe('complete', () => {
    
    it('Should have a score of 1 when only 1 of 2 or more correct answers given', () => {
      let game = new Game(`gm-${newId()}`, "test_gamer", [
        new Item(0, "first-item"), new Item(1, "second-item")
      ]);
      game.complete([
        new Item(0, "first-item")
      ]);
      
      const score = game.getScore();
      expect(score).toBe(1);
    });

    it('Should have score = 3 * number of items when all answers correct', () => {
      let game = Game.initialize("test_gamer");
      game.complete(game?.getItems() ?? []);
      const score = game.getScore();

      expect(score).toBe(3 * (game.getItems() ?? []).length);
    });

    it('Should have a score of 0 when all answers are incorrect', () => {
      let game = new Game(`gm-${newId()}`, "test_gamer", [
        new Item(0, "an-item")
      ]);
      game.complete([
        new Item(0, "different-item")
      ]);

      const score = game.getScore();
      expect(score).toBe(0);
    });

    it('Should have a score of 2 when 2 out of 2 answers are correct but in the wrong order', () => {
      let game = new Game(`gm-${newId()}`, "test_gamer", [
        new Item(0, "first-item"), 
        new Item(1, "second-item")
      ]);

      game.complete([
        new Item(0, "second-item"), 
        new Item(1, "first-item")
      ]);

      const score = game.getScore();
      expect(score).toBe(2);
    });

    it('Should have a score of 2 when 2 out of 3 answers are correct but in the wrong order', () => {
      let game = new Game(`gm-${newId()}`, "test_gamer", [
        new Item(0, "first-item"), 
        new Item(1, "second-item"),
        new Item(2, "third-item")
      ]);

      game.complete([
        new Item(0, "third-item"), 
        new Item(1, "second-item")
      ]);
      
      const score = game.getScore();
      expect(score).toBe(2);
    });

    it('Should have a score of 6 when 2 out of 3 answers are correct and in the right order', () => {
      let game = new Game(`gm-${newId()}`, "test_gamer", [
        new Item(0, "first-item"), 
        new Item(1, "second-item"),
        new Item(2, "third-item")
      ]);

      game.complete([
        new Item(0, "second-item"), 
        new Item(1, "third-item")
      ]);
            
      const score = game.getScore();
      expect(score).toBe(6);
    })
  })
});