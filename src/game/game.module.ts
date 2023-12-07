import { Module } from '@nestjs/common';
import { DataAccessModule } from '../data_access/data_access.module';
import { GameController } from './game.controller';
import { CreateGameHandler } from './create_game';
import { CompleteGameHandler } from './complete_game';
import { RetrieveGameHandler } from './retrieve_game';

@Module({
    imports: [
      DataAccessModule
    ],
    controllers: [
      GameController
    ],
    providers: [
      CreateGameHandler,
      CompleteGameHandler,
      RetrieveGameHandler
    ]
  })
  export class GameModule {}