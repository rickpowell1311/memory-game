import { Module } from '@nestjs/common';
import { PlayerRepository } from './player_repository';

@Module({
  providers: [
    PlayerRepository
  ],
  exports: [
    PlayerRepository
  ]
})
export class DataAccessModule {}