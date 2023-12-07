import { Inject, NotFoundException } from "@nestjs/common";
import { GameRepository } from "../data_access/game_repository";

export interface CompleteGameRequest {
    game_id: string;
    answers: Array<CompleteGameAnswerRequest>;
}

export interface CompleteGameAnswerRequest {
    order: number;
    item: string;
}

export class CompleteGameHandler {
    constructor(@Inject(GameRepository) private gameRepository: GameRepository) {

    }

    public handle(request: CompleteGameRequest): void {
        const game = this.gameRepository.find(request.game_id);

        if (!game) {
            throw new NotFoundException(`Game ${request.game_id} not found`);
        }

        game.complete(request.answers.map(x => {
            return {
                order: x.order,
                description: x.item
            }
        }));

        this.gameRepository.update(game);
    }
}