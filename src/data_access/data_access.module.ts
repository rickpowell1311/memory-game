import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './player.entity';
import { GameEntity } from './game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerEntity]),
    TypeOrmModule.forFeature([GameEntity])
  ]
})
export class DataAccessModule {}