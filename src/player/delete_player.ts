import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";

export interface DeletePlayerRequest {
    gamer_tag: string;
}

export class DeletePlayerHandler {

    constructor(@Inject(DataSource) private dataSource: DataSource) {
    }

    async handle(request: DeletePlayerRequest): Promise<void> {
        await this.dataSource.transaction(async manager => {
            
            await manager.createQueryBuilder()
                .delete()
                .from("game")
                .where("gamer_tag = :gamer_tag", { gamer_tag: request.gamer_tag })
                .execute();

            await manager.createQueryBuilder()
                .delete()
                .from("player")
                .where("gamer_tag = :gamer_tag", { gamer_tag: request.gamer_tag })
                .execute();
        });
    }
}