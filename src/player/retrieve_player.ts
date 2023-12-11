import { Injectable, NotFoundException } from "@nestjs/common";
import { PlayerRepository } from "../data_access/player.repository";

export interface RetrievePlayerRequest {
    gamer_tag: string;
}

export interface RetrievePlayerResponse {
    gamer_tag: string;
    high_score?: number;
}

@Injectable()
export class RetrievePlayerHandler {
    constructor(private repository: PlayerRepository) {
    }

    async handle(request: RetrievePlayerRequest): Promise<RetrievePlayerResponse> {
        const player = await this.repository.find(request.gamer_tag);

        if (!player) {
            throw new NotFoundException(`Player ${request.gamer_tag} not found`);
        }

        return {
            gamer_tag: player.get_gamer_tag(),
            high_score: player.get_high_score()
        }
    }
}