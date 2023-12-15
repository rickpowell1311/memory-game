import { Injectable } from '@nestjs/common';
import { Game } from '../domain/game';
import { DataSource } from 'typeorm';
import { GameEntity } from './game.entity';

@Injectable()
export class GameRepository {
    constructor(private dataSource: DataSource) {
    }

    async add(game: Game) {
        await this.dataSource.createQueryBuilder()
            .insert()
            .into(GameEntity)
            .values(GameEntity.mapFromDomain(game))
            .execute();
    }

    async update(game: Game) {
        await this.dataSource.createQueryBuilder()
            .update(GameEntity)
            .set(GameEntity.mapFromDomain(game))
            .where("id = :id", { id: game.getId() })
            .execute();
    }

    async find(id: string): Promise<Game> {
        const entity = await this.dataSource.getRepository(GameEntity)
            .createQueryBuilder("player")
            .where("id = :id", { id: id })
            .getOne();

        return GameEntity.mapToDomain(entity);
    }
}