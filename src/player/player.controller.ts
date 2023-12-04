import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { RetrievePlayerHandler, RetrievePlayerResponse } from './endpoints/retrieve_player';

@Controller('api/player')
export class PlayerController {
  constructor(private retrievePlayer: RetrievePlayerHandler) {}

  @Get('/:gamer_tag')
  getPlayer(@Param() params: { gamer_tag: string }): RetrievePlayerResponse {
    return this.retrievePlayer.Handle(params.gamer_tag);
  }

  @Delete('/:gamer_tag')
  @HttpCode(204)
  deletePlayer(@Param() params: { gamer_tag: string }) {
  }

  @Post('/:gamer_tag/reset-high-score')
  resetHighScore(@Param() params: { gamer_tag: string }) {
  }
}
