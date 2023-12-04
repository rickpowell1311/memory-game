import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { RetrievePlayerResponse } from './endpoints/retrieve_player';
import { CreateGameResponse } from './endpoints/create_game';

@Controller('api/player')
export class PlayerController {
  constructor() {}

  @Get('/:gamer_tag')
  getPlayer(@Param() params: { gamer_tag: string }): RetrievePlayerResponse {
    // Stub response
    return {
      gamer_tag: params.gamer_tag,
      high_score: 100
    }
  }

  @Delete('/:gamer_tag')
  @HttpCode(204)
  deletePlayer(@Param() params: { gamer_tag: string }) {
  }

  @Post('/:gamer_tag/reset-high-score')
  resetHighScore(@Param() params: { gamer_tag: string }) {
  }
    
  @Post('/:gamer_tag/create-game')
  createGame(@Param() params: { gamer_tag: string }): CreateGameResponse {
    return {
      game_id: 1
    }
  }
}
