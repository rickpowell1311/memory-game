import { Module } from '@nestjs/common';
import { PlayerRepository } from './player_repository';
import { GameRepository } from './game_repository';

@Module({
  providers: [
    PlayerRepository,
    GameRepository
  ],
  exports: [
    PlayerRepository,
    GameRepository
  ]
})
export class DataAccessModule {}