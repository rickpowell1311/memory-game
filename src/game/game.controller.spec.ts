import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { AppModule } from '../app.module';
import { PlayerRepository } from '../data_access/player.repository';

describe('GameController', () => {
  let controller: GameController;
  let player_repository: PlayerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    controller = module.get<GameController>(GameController);
    player_repository = module.get<PlayerRepository>(PlayerRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a game', async () => {
    const response = await controller.createGame({ gamer_tag: 'test_gamer' });
    expect(response.game_id).toBeDefined();
    expect(response.game_id.length).toBeGreaterThan(0);
  });

  describe('when retrieving a game', () => {
    let game_id: string;

    beforeEach(async () => {
      const response = await controller.createGame({ gamer_tag: 'test_gamer' });
      game_id = response.game_id;
    });

    it('should be defined', () => {
      const response = controller.getGame({ game_id });
      expect(response).toBeDefined();
    });

    it('should have a status of Started', async () => {
      const response = await controller.getGame({ game_id });
      expect(response.status).toBe('Started');
    });

    describe('when completing a game', () => {
      beforeEach(async () => {
        await controller.completeGame({ game_id }, { game_id: game_id, answers: [{ item: "Whatever", order: 0 }]});
      });

      it('should have a status of Completed', async () => {
        const response = await controller.getGame({ game_id });
        expect(response.status).toBe('Completed');
      });

      it('should have a score', async () => {
        const response = await controller.getGame({ game_id });
        expect(response.score).toBeDefined();
      });

      it('should set a new high score for the player', async () => {
        const player = await player_repository.find('test_gamer');
        expect(player.get_high_score()).toBeDefined();
      })
    });
  })

  it('should be able to retrieve a game', async () => {
    const gamer_tag = 'test_gamer';
    const createResponse = await controller.createGame({ gamer_tag });
    const response = await controller.getGame({ game_id: createResponse.game_id });
    expect(response.game_id).toBe(createResponse.game_id);
  });
});
