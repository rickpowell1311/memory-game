import { Player } from '../domain/player';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'player' })
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
            gamer_tag: player.getGamerTag(),
            high_score: player.getHighScore()
        } as PlayerEntity;
    }

    mapToDomain(): Player {
        return new Player(this.gamer_tag, this.high_score);
    }
}
