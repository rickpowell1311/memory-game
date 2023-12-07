import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { AppModule } from '../app.module';

describe('GameController', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a game', () => {
    const response = controller.createGame({ gamer_tag: 'test_gamer' });
    expect(response.game_id).toBeDefined();
    expect(response.game_id.length).toBeGreaterThan(0);
  });

  describe('when retrieving a game', () => {
    let game_id: string;

    beforeEach(() => {
      const response = controller.createGame({ gamer_tag: 'test_gamer' });
      game_id = response.game_id;
    });

    it('should be defined', () => {
      const response = controller.getGame({ game_id });
      expect(response).toBeDefined();
    });

    it('should have a status of Started', () => {
      const response = controller.getGame({ game_id });
      expect(response.status).toBe('Started');
    });

    describe('when completing a game', () => {
      beforeEach(() => {
        controller.completeGame({ game_id }, { game_id: game_id, answers: [{ item: "Whatever", order: 0 }]});
      });

      it('should have a status of Completed', () => {
        const response = controller.getGame({ game_id });
        expect(response.status).toBe('Completed');
      });

      it('should have a score', () => {
        const response = controller.getGame({ game_id });
        expect(response.score).toBeDefined();
      });
    });
  })

  it('should be able to retrieve a game', () => {
    const gamer_tag = 'test_gamer';
    const createResponse = controller.createGame({ gamer_tag });
    const response = controller.getGame({ game_id: createResponse.game_id });
    expect(response.game_id).toBe(createResponse.game_id);
  });
});
