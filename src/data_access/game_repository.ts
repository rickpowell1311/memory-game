import { Injectable } from '@nestjs/common';
import { Game } from '../domain/game';

@Injectable()
export class GameRepository {
    private store: Array<Game>;

    constructor() {
        this.store = [];
    }

    add(game: Game) {
        this.store.push(game);
    }

    update(game: Game) {
        this.store = this.store.map(g => g.getId() === game.getId() ? game : g);
    }

    find(id: string): Game {
        return this.store.find(game => game.getId() === id);
    }
}