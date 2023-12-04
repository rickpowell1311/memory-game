import { Controller, Get, Post, Delete, Param } from '@nestjs/common';

@Controller('api/player')
export class PlayerController {
  constructor() {}

  @Get('/:gamer_tag')
  getPlayer(@Param() params: { gamer_tag: string }) {
    return `Hello ${params.gamer_tag}`;
  }

  @Delete('/:gamer_tag')
  deletePlayer(@Param() params: { gamer_tag: string }) {
    return `Deleting ${params.gamer_tag}`;
  }

  @Post('/:gamer_tag/reset-high-score')
  resetHighScore(@Param() params: { gamer_tag: string }) {
    return `Resetting high score for ${params.gamer_tag}`;
  }
    
  @Post('/:gamer_tag/create-game')
  createGame(@Param() params: { gamer_tag: string }) {
    return `Creating game for ${params.gamer_tag}`;
  }
}
