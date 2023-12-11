export interface DeletePlayerRequest {
    gamer_tag: string;
}

export class DeletePlayerHandler {
    async handle(request: DeletePlayerRequest): Promise<void> {
        return;
    }
}