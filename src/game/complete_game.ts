import { Inject, Logger, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { GameEntity } from "../data_access/game.entity";
import { PlayerEntity } from "../data_access/player.entity";
import { z } from "zod";

export interface CompleteGameRequest {
    game_id: string;
    answers: Array<CompleteGameAnswerRequest>;
}

export const CompleteGameRequestValidator = z.object({
    answers: z.array(z.object({
        order: z.number(),
        item: z.string().min(1).max(100)
    }))
});

export interface CompleteGameAnswerRequest {
    order: number;
    item: string;
}

export class CompleteGameHandler {
    private readonly logger = new Logger(CompleteGameHandler.name);

    constructor(@Inject(DataSource) private dataSource: DataSource) {
    }

    public async handle(request: CompleteGameRequest): Promise<void> {
        
        let gameEntity = await this.dataSource.getRepository(GameEntity)
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
        player.recordScore(game.getScore() ?? 0);

        await this.dataSource.transaction(async manager => {
            gameEntity = GameEntity.mapFromDomain(game);
            manager.createQueryBuilder()
                .update(GameEntity)
                .set(gameEntity)
                .where("id = :id", { id: game.getId() })
                .execute();

            playerEntity = PlayerEntity.mapFromDomain(player);
            await manager.createQueryBuilder()
                .update(PlayerEntity)
                .set(playerEntity)
                .where("gamer_tag = :gamer_tag", { gamer_tag: player.getGamerTag() })
                .execute();
        });

        this.logger.log(`Game ${game.getId()} completed for player ${player.getGamerTag()}. The score was ${game.getScore()}, and this player's high score is ${player.getHighScore()}`);
    }
}