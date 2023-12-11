import { Player } from '../domain/player';
import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity()
export class PlayerEntity {

    @PrimaryColumn()
    gamer_tag: string;

    @Column()
    high_score?: number;

    static mapFromDomain(player: Player): PlayerEntity {
        if (!player) {
            throw new Error('Player cannot be undefined');
        }

        return {
            gamer_tag: player.get_gamer_tag(),
            high_score: player.get_high_score()
        };
    }

    static mapToDomain(entity: PlayerEntity): Player {
        return entity
            ? new Player(entity.gamer_tag, entity.high_score)
            : undefined;
    }
}
