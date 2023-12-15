import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Game } from "../domain/game";

class GameItems {
    items: GameItem[];
}

class GameItem {
    order: number;
    description: string;
}

@Entity({ name: 'game' })
export class GameEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    gamer_tag: string;

    @Column({ type: 'json' })
    game_items: GameItems;

    @Column({ type: 'json' })
    game_answers?: GameItems;

    @Column()
    score?: number;

    static mapFromDomain(game: Game): GameEntity {
        if (!game) {
            throw new Error('Game cannot be undefined');
        }

        return {
            id: game.getId(),
            gamer_tag: game.getGamerTag(),
            game_items: {
                items: game.getItems().map(x => {
                    return {
                        order: x.order,
                        description: x.description
                    } as GameItem;
                })
            },
            game_answers: game.getAnswers()?.length > 0 
                ? {
                    items: game.getAnswers().map(x => {
                        return {
                            order: x.order,
                            description: x.description
                        } as GameItem;
                    })
                }
                : undefined,
            score: game.getScore()
        } as GameEntity;
    }

    mapToDomain(): Game {
        return new Game(
            this.id,
            this.gamer_tag, 
            this.game_items.items.map(x => {
                return {
                    order: x.order,
                    description: x.description
                } as GameItem;
            }),
            this.game_answers?.items?.map(x => {
                return {
                    order: x.order,
                    description: x.description
                } as GameItem;
            }),
            this.score);
    }
}