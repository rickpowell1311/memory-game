import { Injectable } from '@nestjs/common';
import { Player } from '../domain/player';
import { PlayerEntity } from './player.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PlayerRepository {
    constructor(private dataSource: DataSource) {
    }

    async add(player: Player) {
        await this.dataSource.createQueryBuilder()
            .insert()
            .into(PlayerEntity)
            .values(PlayerEntity.mapFromDomain(player))
            .execute();
    }

    async find(gamer_tag: string): Promise<Player> {
        const entity = await this.dataSource.getRepository(PlayerEntity)
            .createQueryBuilder("player")
            .where("player.gamer_tag = :gamer_tag", { gamer_tag: gamer_tag })
            .getOne();

        return PlayerEntity.mapToDomain(entity);
    }

    async update(player: Player) {
        await this.dataSource.createQueryBuilder()
            .update(PlayerEntity)
            .set(PlayerEntity.mapFromDomain(player))
            .where("gamer_tag = :gamer_tag", { gamer_tag: player.get_gamer_tag() })
            .execute();
    }

    async delete(player: Player) {
        await this.dataSource.createQueryBuilder()
            .delete()
            .from(PlayerEntity)
            .where("gamer_tag = :gamer_tag", { gamer_tag: player.get_gamer_tag() })
            .execute();
    }
}