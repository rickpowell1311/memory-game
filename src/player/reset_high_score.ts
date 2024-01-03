import { Inject, Logger } from "@nestjs/common";
import { PlayerEntity } from "../data_access/player.entity";
import { DataSource } from "typeorm";

export interface ResetHighScoreRequest {
    gamer_tag: string;
}

export class ResetHighScoreHandler {

    private readonly logger = new Logger(ResetHighScoreHandler.name);

    constructor(@Inject(DataSource) private dataSource: DataSource) {
    }

    async handle(request: ResetHighScoreRequest): Promise<void> {
        let entity = await this.dataSource.getRepository(PlayerEntity)
            .createQueryBuilder()
            .where("gamer_tag = :gamer_tag", { gamer_tag: request.gamer_tag })
            .getOne();

        if (!entity) {
            throw new Error(`Player ${request.gamer_tag} not found`);
        }

        let player = entity.mapToDomain();
        player.resetHighScore();

        entity = PlayerEntity.mapFromDomain(player);

        await this.dataSource.getRepository(PlayerEntity)
            .createQueryBuilder()
            .update()
            .where("gamer_tag = :gamer_tag", { gamer_tag: request.gamer_tag })
            .set(entity)
            .execute();

        this.logger.log(`High score reset for player ${request.gamer_tag}`);
    }
}