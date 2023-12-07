import { Body, Controller, Get, Post, Put, Param, HttpCode } from '@nestjs/common';
import { RetrieveGameHandler, RetrieveGameResponse } from './retrieve_game';
import { CompleteGameHandler, CompleteGameRequest } from './complete_game';
import { CreateGameHandler, CreateGameResponse } from './create_game';

@Controller('api/game')
export class GameController {
  constructor(
    private createGameHandler: CreateGameHandler, 
    private completeGameHandler: CompleteGameHandler, 
    private retrieveGameHandler: RetrieveGameHandler) {}

  @Post('create/:gamer_tag')
  @HttpCode(201)
  createGame(@Param() params: { gamer_tag: string }): CreateGameResponse {
    return this.createGameHandler.handle({ gamer_tag: params.gamer_tag, number_of_items: 5 });
  }

  @Get('/:game_id')
  getGame(@Param() params: { game_id: string }): RetrieveGameResponse {
    return this.retrieveGameHandler.handle({ game_id: params.game_id });
  }
  
  @Put('/:game_id')
  completeGame(@Param() params: { game_id: string }, @Body() body: CompleteGameRequest) {
    return this.completeGameHandler.handle({ ...body, game_id: params.game_id });
  }
}
