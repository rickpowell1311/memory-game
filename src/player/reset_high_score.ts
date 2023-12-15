import { Inject } from "@nestjs/common";
import { PlayerEntity } from "../data_access/player.entity";
import { DataSource } from "typeorm";

export interface ResetHighScoreRequest {
    gamer_tag: string;
}

export class ResetHighScoreHandler {

    constructor(@Inject(DataSource) private dataSource: DataSource) {
    }

    async handle(request: ResetHighScoreRequest): Promise<void> {
        const entity = await this.dataSource.getRepository(PlayerEntity)
            .createQueryBuilder()
            .where("gamer_tag = :gamer_tag", { gamer_tag: request.gamer_tag })
            .getOne();

        if (!entity) {
            throw new Error(`Player ${request.gamer_tag} not found`);
        }

        let player = entity.mapToDomain();
        player.resetHighScore();

        await this.dataSource.getRepository(PlayerEntity)
            .createQueryBuilder()
            .update()
            .where("gamer_tag = :gamer_tag", { gamer_tag: request.gamer_tag })
            .set(PlayerEntity.mapFromDomain(player))
            .execute();
    }
}