import { Injectable, NotFoundException } from "@nestjs/common";
import { PlayerRepository } from "../../core/data_access/player_repository";

export interface RetrievePlayerResponse {
    gamer_tag: string;
    high_score?: number;
}

@Injectable()
export class RetrievePlayerHandler {
    constructor(private repository: PlayerRepository) {
    }

    Handle(gamer_tag: string): RetrievePlayerResponse {
        const player = this.repository.find(gamer_tag);

        if (!player) {
            throw new NotFoundException(`Player ${gamer_tag} not found`);
        }

        return {
            gamer_tag: player.get_gamer_tag(),
            high_score: player.get_high_score()
        }
    }
}