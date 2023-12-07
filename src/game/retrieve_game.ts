import { Inject, NotFoundException } from "@nestjs/common";
import { GameRepository } from "../data_access/game_repository";

export interface RetrieveGameRequest {
    game_id: string;
}

export interface RetrieveGameResponse {
    game_id: string;
    status: "Started" | "Completed";
    items: Array<RetrieveGameItemResponse>;
    answers?: Array<RetrieveGameItemResponse>;
    score?: number;
}

export interface RetrieveGameItemResponse {
    order: number;
    item: string;
}

export class RetrieveGameHandler {

    constructor(@Inject(GameRepository) private gameRepository: GameRepository) {
    }

    public handle(request: RetrieveGameRequest): RetrieveGameResponse {
        const game = this.gameRepository.find(request.game_id);

        if (!game) {
            throw new NotFoundException(`Game ${request.game_id} not found`);
        }

        return {
            game_id: game.getId(),
            status: game.getStatus(),
            items: game.getItems().map(x => {
                return {
                    order: x.order,
                    item: x.description
                } as RetrieveGameItemResponse;
            }),
            answers: game.getAnswers()?.map(x => {
                return {
                    order: x.order,
                    item: x.description
                } as RetrieveGameItemResponse;
            }),
            score: game.getScore()
        } as RetrieveGameResponse;
    }
}