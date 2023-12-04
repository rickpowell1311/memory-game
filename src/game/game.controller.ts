import { Body, Controller, Get, Put, Param } from '@nestjs/common';
import { RetrieveGameResponse } from './endpoints/retrieve_game';
import { CompleteGameRequest } from './endpoints/complete_game';

@Controller('api/game')
export class GameController {
  constructor() {}

  @Get('/:game_id')
  getGame(@Param() params: { game_id: number }): RetrieveGameResponse {
    // Stub a response
    return {
      game_id: params.game_id,
      status: 'Completed',
      items: [
        {
          order: 1,
          item: 'apple'
        },
        {
          order: 2,
          item: 'Orange'
        }
      ],
      score: 31
    };
  }
  
  @Put('/:game_id')
  completeGame(@Param() params: { game_id: number }, @Body() _: CompleteGameRequest) {
    // Stub a response
    return `Completing game ${params.game_id}`;
  }
}
