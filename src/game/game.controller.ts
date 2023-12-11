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
  async createGame(@Param() params: { gamer_tag: string }): Promise<CreateGameResponse> {
    return await this.createGameHandler.handle({ gamer_tag: params.gamer_tag, number_of_items: 5 });
  }

  @Get('/:game_id')
  async getGame(@Param() params: { game_id: string }): Promise<RetrieveGameResponse> {
    return await this.retrieveGameHandler.handle({ game_id: params.game_id });
  }
  
  @Put('/:game_id')
  async completeGame(@Param() params: { game_id: string }, @Body() body: CompleteGameRequest) {
    return await this.completeGameHandler.handle({ ...body, game_id: params.game_id });
  }
}
