import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { RetrievePlayerHandler } from './endpoints/retrieve_player';
import { PlayerRepository } from '../core/data_access/player_repository';

describe('PlayerController', () => {
  let controller: PlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [RetrievePlayerHandler, PlayerRepository]
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
