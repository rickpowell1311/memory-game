import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './data_access/player_repository';
import { RetrievePlayerHandler } from './endpoints/retrieve_player';

@Module({
  controllers: [PlayerController],
  providers: [
    PlayerRepository,
    RetrievePlayerHandler
  ]
})
export class PlayerModule {}
