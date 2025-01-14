import { DataSource, DataSourceOptions, DatabaseType } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
import * as process from 'node:process';

const envFilePath = `${process.cwd()}/env/.env`;

config({ path: envFilePath });

export function buildDataSourceOptions(): DataSourceOptions {
  return {
    type: process.env.DB_TYPE as DatabaseType,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(process.cwd(), './**/', '*.entity.js')],
    migrations: [join(process.cwd(), './dist/migrations/', '*.js')],
    autoLoadEntities: true,
    synchronize: false,
  } as DataSourceOptions;
}

export default new DataSource(buildDataSourceOptions());
