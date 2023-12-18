import { Game } from "../domain/game";
import { Inject, Logger } from "@nestjs/common";
import { Player } from "../domain/player";
import { DataSource } from "typeorm";
import { PlayerEntity } from "../data_access/player.entity";
import { GameEntity } from "../data_access/game.entity";

export interface CreateGameRequest {
    gamer_tag: string;
    number_of_items: number;
}

export interface CreateGameResponse {
    game_id: string;
}

export class CreateGameHandler {
    private readonly logger = new Logger(CreateGameHandler.name);

    constructor(@Inject(DataSource) private dataSource: DataSource) {
    }

    public async handle(request: CreateGameRequest): Promise<CreateGameResponse> {

        const playerEntity = await this.dataSource.getRepository(PlayerEntity)
            .createQueryBuilder("player")
            .where("player.gamer_tag = :gamer_tag", { gamer_tag: request.gamer_tag })
            .getOne();

        let game_id = "";

        await this.dataSource.transaction(async manager => { 
            if (!playerEntity) {
                this.logger.log(`Player ${request.gamer_tag} does not exist. Creating...`);

                const player = new Player(request.gamer_tag);

                await manager.createQueryBuilder()
                    .insert()
                    .into(PlayerEntity)
                    .values(PlayerEntity.mapFromDomain(player))
                    .execute();
            }

            const game = Game.initialize(request.gamer_tag, request.number_of_items);
            const gameEntity = GameEntity.mapFromDomain(game);
            await manager.createQueryBuilder()
                .insert()
                .into(GameEntity)
                .values(gameEntity)
                .execute();

            game_id = gameEntity.id;

            this.logger.log(`Game with Id ${gameEntity.id} created for player ${request.gamer_tag}`);
        });

        return {
            game_id: game_id
        } as CreateGameResponse;
    }
}