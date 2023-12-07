export interface RetrieveGameRequest {
    game_id: string;
}

export interface RetrieveGameResponse {
    game_id: string;
    status: "Started" | "Completed";
    items: Array<RetrieveGameItemResponse>;
    score?: number;
}

export interface RetrieveGameItemResponse {
    order: number;
    item: string;
}

export class RetrieveGameHandler {
    public handle(request: RetrieveGameRequest): RetrieveGameResponse {
        // Stub a response
        return {
            game_id: request.game_id,
            status: 'Completed',
            items: [
                {
                order: 1,
                item: 'apple'
                },
                {
                order: 2,
                item: 'Orange'
                }
            ],
            score: 31
        } as RetrieveGameResponse;
    }
}