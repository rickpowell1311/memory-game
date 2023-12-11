import { MigrationInterface, QueryRunner } from "typeorm"

export class PlayerTable1702293936303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE player (
                gamer_tag VARCHAR(255) PRIMARY KEY,
                high_score INT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE player;
        `);
    }
}
