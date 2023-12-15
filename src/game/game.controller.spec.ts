import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { PlayerEntity } from '../data_access/player.entity';
import { newId } from '../domain/id';

describe('GameController', () => {
  let controller: GameController;
  let data_source: DataSource;
  let gamer_tag: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    controller = module.get<GameController>(GameController);
    data_source = module.get<DataSource>(DataSource);
    gamer_tag = `test_gamer_${newId()}`;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a game', async () => {
    const response = await controller.createGame({ gamer_tag: gamer_tag });
    expect(response.game_id).toBeDefined();
    expect(response.game_id.length).toBeGreaterThan(0);
  });

  describe('when retrieving a game', () => {
    let game_id: string;

    beforeEach(async () => {
      const response = await controller.createGame({ gamer_tag: gamer_tag });
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
        const player = await data_source.getRepository(PlayerEntity)
          .createQueryBuilder("player")
          .where("player.gamer_tag = :gamer_tag", { gamer_tag: gamer_tag })
          .getOne();
        expect(player.high_score).toBeDefined();
      })
    });
  })

  it('should be able to retrieve a game', async () => {
    const createResponse = await controller.createGame({ gamer_tag });
    const response = await controller.getGame({ game_id: createResponse.game_id });
    expect(response.game_id).toBe(createResponse.game_id);
  });
});
