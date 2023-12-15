import { Inject, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { GameEntity } from "../data_access/game.entity";
import { PlayerEntity } from "../data_access/player.entity";

export interface CompleteGameRequest {
    game_id: string;
    answers: Array<CompleteGameAnswerRequest>;
}

export interface CompleteGameAnswerRequest {
    order: number;
    item: string;
}

export class CompleteGameHandler {
    constructor(@Inject(DataSource) private dataSource: DataSource) {
    }

    public async handle(request: CompleteGameRequest): Promise<void> {
        
        const gameEntity = await this.dataSource.getRepository(GameEntity)
            .createQueryBuilder("player")
            .where("id = :id", { id: request.game_id })
            .getOne();

        if (!gameEntity) {
            throw new NotFoundException(`Game ${request.game_id} not found`);
        }

        let playerEntity = await this.dataSource.getRepository(PlayerEntity)
            .createQueryBuilder("player")
            .where("player.gamer_tag = :gamer_tag", { gamer_tag: gameEntity.gamer_tag })
            .getOne();

        if (!playerEntity) {
            throw new NotFoundException(`Player ${gameEntity.gamer_tag} not found`);
        }

        let game = gameEntity.mapToDomain();
        game.complete(request.answers.map(x => {
            return {
                order: x.order,
                description: x.item
            }
        }));
        let player = playerEntity.mapToDomain();
        player.recordScore(gameEntity.score ?? 0);

        await this.dataSource.transaction(async manager => {
            manager.createQueryBuilder()
                .update(GameEntity)
                .set(GameEntity.mapFromDomain(game))
                .where("id = :id", { id: game.getId() })
                .execute();

            await manager.createQueryBuilder()
                .update(PlayerEntity)
                .set(PlayerEntity.mapFromDomain(player))
                .where("gamer_tag = :gamer_tag", { gamer_tag: player.get_gamer_tag() })
                .execute();
        });
    }
}