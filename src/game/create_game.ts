import { Game } from "../domain/game";
import { GameRepository } from "../data_access/game_repository";
import { Inject } from "@nestjs/common";

export interface CreateGameRequest {
    gamer_tag: string;
    number_of_items: number;
}

export interface CreateGameResponse {
    game_id: string;
}

export class CreateGameHandler {
    constructor(@Inject(GameRepository) private gameRepository: GameRepository) {
    }

    public handle(request: CreateGameRequest): CreateGameResponse {
        const game = Game.initialize(request.gamer_tag, request.number_of_items);
        this.gameRepository.add(game);

        return {
            game_id: game.getId()
        } as CreateGameResponse;
    }
}