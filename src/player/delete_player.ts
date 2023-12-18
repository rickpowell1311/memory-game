import { Inject, Logger } from "@nestjs/common";
import { DataSource } from "typeorm";

export interface DeletePlayerRequest {
    gamer_tag: string;
}

export class DeletePlayerHandler {

    private readonly logger = new Logger(DeletePlayerHandler.name);

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

        this.logger.log(`Player ${request.gamer_tag} deleted. All games for this player have also been deleted.`);
    }
}