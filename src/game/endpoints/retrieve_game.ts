export interface RetrieveGameResponse {
    game_id: number;
    status: "Started" | "Completed";
    items: Array<RetrieveGameItemResponse>;
    score?: number;
}

interface RetrieveGameItemResponse {
    order: number;
    item: string;
}