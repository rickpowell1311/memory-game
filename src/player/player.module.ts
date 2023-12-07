import { Module } from '@nestjs/common';
import { DataAccessModule } from '../data_access/data_access.module';
import { PlayerController } from './player.controller';
import { RetrievePlayerHandler } from './retrieve_player';
import { DeletePlayerHandler } from './delete_player';
import { ResetHighScoreHandler } from './reset_high_score';

@Module({
  imports: [
    DataAccessModule
  ],
  controllers: [
    PlayerController
  ],
  providers: [
    RetrievePlayerHandler,
    DeletePlayerHandler,
    ResetHighScoreHandler
  ]
})
export class PlayerModule {}