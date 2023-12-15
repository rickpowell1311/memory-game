import { MigrationInterface, QueryRunner } from "typeorm"

export class AddGameTable1702306550811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE game (
                id VARCHAR(255) PRIMARY KEY,
                gamer_tag VARCHAR(255) NOT NULL,
                game_items JSON NOT NULL,
                game_answers JSON NULL,
                score INT NULL,
                CONSTRAINT fk_game_player FOREIGN KEY (gamer_tag) REFERENCES player(gamer_tag)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE game;
        `);
    }
}
