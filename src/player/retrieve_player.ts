import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PlayerEntity } from "../data_access/player.entity";
import { DataSource } from "typeorm";

export interface RetrievePlayerRequest {
    gamer_tag: string;
}

export interface RetrievePlayerResponse {
    gamer_tag: string;
    high_score?: number;
}

@Injectable()
export class RetrievePlayerHandler {
    constructor(@Inject(DataSource) private dataSource: DataSource) {
    }

    async handle(request: RetrievePlayerRequest): Promise<RetrievePlayerResponse> {

        const entity = await this.dataSource.getRepository(PlayerEntity)
            .createQueryBuilder("player")
            .where("player.gamer_tag = :gamer_tag", { gamer_tag: request.gamer_tag })
            .getOne();

        if (!entity) {
            throw new NotFoundException(`Player ${request.gamer_tag} not found`);
        }

        return {
            gamer_tag: entity.gamer_tag,
            high_score: entity.high_score
        }
    }
}