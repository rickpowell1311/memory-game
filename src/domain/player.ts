export class Player {
    constructor(private gamer_tag: string, private high_score?: number) {
    }

    recordScore(score: number) {
        if (!this.high_score || this.high_score < score) {
            this.high_score = score;
        }
    }

    resetHighScore() {
        this.high_score = undefined;
    }

    get_high_score(): number | undefined { return this.high_score; }

    get_gamer_tag(): string { return this.gamer_tag; }
}
