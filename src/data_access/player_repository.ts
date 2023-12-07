import { Injectable } from '@nestjs/common';
import { Player } from '../domain/player';

@Injectable()
export class PlayerRepository {
    private store: Array<Entity>;

    constructor() {
        this.store = [];
    }

    add(player: Player) {
        this.store.push(Entity.mapFromDomain(player))
    }

    find(gamer_tag: string): Player {
        return Entity.mapToDomain(this.store.find(player => player.gamer_tag === gamer_tag));
    }

    delete(player: Player) {
        this.store = this.store.filter(p => p.gamer_tag !== player.get_gamer_tag());
    }
}

class Entity {
    gamer_tag: string;
    high_score?: number;

    static mapFromDomain (player: Player): Entity {
        if (!player) {
            throw new Error('Player cannot be undefined');
        }

        return {
            gamer_tag: player.get_gamer_tag(),
            high_score: player.get_high_score()
        };
    }

    static mapToDomain (entity: Entity): Player {
        return entity 
            ? new Player(entity.gamer_tag, entity.high_score)
            : undefined;
    }
}