import { Module } from '@nestjs/common';
import { PlayerRepository } from './player.repository';
import { GameRepository } from './game.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerEntity])
  ],
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