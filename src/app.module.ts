import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { DataAccessModule } from './data_access/data_access.module';

@Module({
  imports: [
    GameModule, 
    PlayerModule,
    DataAccessModule]
})
export class AppModule {}
