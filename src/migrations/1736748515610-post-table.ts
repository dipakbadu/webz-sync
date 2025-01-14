import { MigrationInterface, QueryRunner } from "typeorm";

export class PostTable1736748515610 implements MigrationInterface {
    name = 'PostTable1736748515610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "url" character varying NOT NULL, "author" character varying, "published" TIMESTAMP NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
