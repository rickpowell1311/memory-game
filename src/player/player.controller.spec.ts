import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { AppModule } from '../app.module';
import { newId } from '../domain/id';
import { DataSource } from 'typeorm';
import { Game } from '../domain/game';
import { GameEntity } from '../data_access/game.entity';
import { Player } from '../domain/player';
import { PlayerEntity } from '../data_access/player.entity';

describe('PlayerController', () => {
  let controller: PlayerController;
  let data_source: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    controller = await module.resolve(PlayerController);
    data_source = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when resetting a player\'s high score', () => {
    let gamer_tag: string;
    let game: Game;
    let player: Player;

    beforeEach(async () => {
      gamer_tag = `test_gamer_${newId()}`;
      game = Game.initialize(gamer_tag);
      player = new Player(gamer_tag);

      await data_source.transaction(async manager => {
        await manager.createQueryBuilder()
          .insert()
          .into('player')
          .values(PlayerEntity.mapFromDomain(player))
          .execute();

        await manager.createQueryBuilder()
          .insert()
          .into('game')
          .values(GameEntity.mapFromDomain(game))
          .execute();
      })
    });

    it('the high score should be falsy', async () => {
      await controller.resetHighScore({ gamer_tag });

      const entity = await data_source.getRepository(PlayerEntity)
        .createQueryBuilder('player')
        .where('player.gamer_tag = :gamer_tag', { gamer_tag })
        .getOne();

      expect(entity?.high_score).toBeFalsy();
    });
  });

  describe('when deleting a player', () => {
    let gamer_tag: string;
    let game: Game;
    let player: Player;

    beforeEach(async () => {
      gamer_tag = `test_gamer_${newId()}`;
      game = Game.initialize(gamer_tag);
      player = new Player(gamer_tag);

      await data_source.transaction(async manager => {
        await manager.createQueryBuilder()
          .insert()
          .into('player')
          .values(PlayerEntity.mapFromDomain(player))
          .execute();

        await manager.createQueryBuilder()
          .insert()
          .into('game')
          .values(GameEntity.mapFromDomain(game))
          .execute();
      })
    });

    it('no record of the player or their games should exist', async () => {
      await controller.deletePlayer({ gamer_tag });

      const players_with_gamer_tag = await data_source.getRepository(PlayerEntity)
        .createQueryBuilder('player')
        .where('player.gamer_tag = :gamer_tag', { gamer_tag })
        .getCount();

      expect(players_with_gamer_tag).toEqual(0);

      const games_with_gamer_tag = await data_source.getRepository(GameEntity)
        .createQueryBuilder('game')
        .where('game.gamer_tag = :gamer_tag', { gamer_tag })
        .getCount();

      expect(games_with_gamer_tag).toEqual(0);
    });
  });
});
