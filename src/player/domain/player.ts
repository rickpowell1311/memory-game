export class Player {
    constructor(private gamer_tag: string, private high_score?: number) {
    }

    set_high_score(score: number) {
        this.high_score = score;
    }

    reset_high_score() {
        this.high_score = undefined;
    }

    get_high_score(): number | undefined { return this.high_score; }

    get_gamer_tag(): string { return this.gamer_tag; }
}
