import { Module } from '@nestjs/common';
import { PlayerRepository } from './player.repository';
import { GameRepository } from './game.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './player.entity';
import { GameEntity } from './game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerEntity]),
    TypeOrmModule.forFeature([GameEntity])
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