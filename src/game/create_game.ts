export interface CreateGameRequest {
    gamer_tag: string;
    number_of_items: number;
}

export interface CreateGameResponse {
    game_id: number;
}

export class CreateGameHandler {
    public handle(request: CreateGameRequest): CreateGameResponse {
        // Stub the response
        return {
            game_id: 1
        } as CreateGameResponse;
    }
}