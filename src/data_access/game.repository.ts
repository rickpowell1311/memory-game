import { Injectable } from '@nestjs/common';
import { Game } from '../domain/game';

@Injectable()
export class GameRepository {
    private store: Array<Game>;

    constructor() {
        this.store = [];
    }

    async add(game: Game) {
        this.store.push(game);
        
        return new Promise<void>(() => {});
    }

    async update(game: Game) {
        this.store = this.store.map(g => g.getId() === game.getId() ? game : g);

        return new Promise<void>(() => {});
    }

    async find(id: string): Promise<Game> {
        const game = this.store.find(game => game.getId() === id);
        return new Promise<Game>(() => game);
    }
}