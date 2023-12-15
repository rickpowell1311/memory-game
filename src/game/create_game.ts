import { Game } from "../domain/game";
import { Inject } from "@nestjs/common";
import { Player } from "../domain/player";
import { DataSource } from "typeorm";
import { PlayerEntity } from "../data_access/player.entity";
import { GameEntity } from "src/data_access/game.entity";

export interface CreateGameRequest {
    gamer_tag: string;
    number_of_items: number;
}

export interface CreateGameResponse {
    game_id: string;
}

export class CreateGameHandler {
    constructor(@Inject(DataSource) private dataSource: DataSource) {
    }

    public async handle(request: CreateGameRequest): Promise<CreateGameResponse> {

        const playerEntity = await this.dataSource.getRepository(PlayerEntity)
            .createQueryBuilder("player")
            .where("player.gamer_tag = :gamer_tag", { gamer_tag: request.gamer_tag })
            .getOne();

        let game: Game;
        await this.dataSource.transaction(async manager => { 
            if (!playerEntity) {
                const player = new Player(request.gamer_tag);

                await manager.createQueryBuilder()
                    .insert()
                    .into(PlayerEntity)
                    .values(PlayerEntity.mapFromDomain(player))
                    .execute();
            }

            game = Game.initialize(request.gamer_tag, request.number_of_items);
            await manager.createQueryBuilder()
                .insert()
                .into(GameEntity)
                .values(GameEntity.mapFromDomain(game))
                .execute();
        });

        return {
            game_id: game.getId()
        } as CreateGameResponse;
    }
}