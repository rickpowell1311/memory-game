import { Controller, Get, Delete, Param, HttpCode, Put } from '@nestjs/common';
import { RetrievePlayerHandler } from './retrieve_player';
import { ResetHighScoreHandler } from './reset_high_score';
import { DeletePlayerHandler } from './delete_player';

@Controller('api/player')
export class PlayerController {
  constructor(private retrievePlayer: RetrievePlayerHandler, private resetHighScoreHandler: ResetHighScoreHandler, private deletePlayerHandler: DeletePlayerHandler) {}

  @Get('/:gamer_tag')
  async getPlayer(@Param() params: { gamer_tag: string }) {
    return await this.retrievePlayer.handle({ gamer_tag: params.gamer_tag });
  }

  @Delete('/:gamer_tag')
  @HttpCode(204)
  async deletePlayer(@Param() params: { gamer_tag: string }) {
    return await this.deletePlayerHandler.handle({ gamer_tag: params.gamer_tag });
  }

  @Put('/:gamer_tag/reset-high-score')
  async resetHighScore(@Param() params: { gamer_tag: string }) {
    return await this.resetHighScoreHandler.handle({ gamer_tag: params.gamer_tag });
  }
}
