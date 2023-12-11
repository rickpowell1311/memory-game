import { Inject, NotFoundException } from "@nestjs/common";
import { GameRepository } from "../data_access/game.repository";
import { PlayerRepository } from "../data_access/player.repository";

export interface CompleteGameRequest {
    game_id: string;
    answers: Array<CompleteGameAnswerRequest>;
}

export interface CompleteGameAnswerRequest {
    order: number;
    item: string;
}

export class CompleteGameHandler {
    constructor(
        @Inject(GameRepository) private gameRepository: GameRepository,
        @Inject(PlayerRepository) private playerRepository: PlayerRepository) {
    }

    public async handle(request: CompleteGameRequest): Promise<void> {
        const game = await this.gameRepository.find(request.game_id);

        if (!game) {
            throw new NotFoundException(`Game ${request.game_id} not found`);
        }

        // Ideally this would be part of one unit of work.
        game.complete(request.answers.map(x => {
            return {
                order: x.order,
                description: x.item
            }
        }));

        this.gameRepository.update(game);

        let player = await this.playerRepository.find(game.getGamerTag());

        if (player) {
            player.record_score(game.getScore());
            this.playerRepository.update(player);
        }
    }
}