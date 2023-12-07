import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { AppModule } from '../app.module';

describe('PlayerController', () => {
  let controller: PlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    controller = await module.resolve(PlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
