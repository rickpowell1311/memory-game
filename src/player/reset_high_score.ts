export interface ResetHighScoreRequest {
    gamer_tag: string;
}

export class ResetHighScoreHandler {
    async handle(request: ResetHighScoreRequest): Promise<void> {
        return;
    }
}