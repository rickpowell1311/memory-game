import { Inject, NotFoundException } from "@nestjs/common";
import { GameEntity } from "../data_access/game.entity";
import { DataSource } from "typeorm";

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

    constructor(@Inject(DataSource) private dataSource: DataSource) {
    }

    public async handle(request: RetrieveGameRequest): Promise<RetrieveGameResponse> {
        const entity = await this.dataSource.getRepository(GameEntity)
            .createQueryBuilder("player")
            .where("id = :id", { id: request.game_id })
            .getOne();

        if (!entity) {
            throw new NotFoundException(`Game ${request.game_id} not found`);
        }

        return {
            game_id: entity.id,
            status: entity.game_answers && entity.game_answers.items.length > 0 ? "Completed" : "Started",
            items: entity.game_answers?.items.map(x => {
                return {
                    order: x.order,
                    item: x.description
                } as RetrieveGameItemResponse;
            }),
            answers: entity.game_answers?.items.map(x => {
                return {
                    order: x.order,
                    item: x.description
                } as RetrieveGameItemResponse;
            }),
            score: entity.score
        } as RetrieveGameResponse;
    }
}