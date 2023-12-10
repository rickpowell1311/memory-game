import { Game } from "../domain/game";
import { GameRepository } from "../data_access/game_repository";
import { Inject } from "@nestjs/common";
import { PlayerRepository } from "../data_access/player_repository";
import { Player } from "../domain/player";

export interface CreateGameRequest {
    gamer_tag: string;
    number_of_items: number;
}

export interface CreateGameResponse {
    game_id: string;
}

export class CreateGameHandler {
    constructor(
        @Inject(GameRepository) private gameRepository: GameRepository,
        @Inject(PlayerRepository) private playerRepository: PlayerRepository) {
    }

    public handle(request: CreateGameRequest): CreateGameResponse {

        const player = this.playerRepository.find(request.gamer_tag);

        // Ideally these data access changes would be one unit of work.
        if (!player) {
            this.playerRepository.add(new Player(request.gamer_tag));
        }

        const game = Game.initialize(request.gamer_tag, request.number_of_items);
        this.gameRepository.add(game);

        return {
            game_id: game.getId()
        } as CreateGameResponse;
    }
}