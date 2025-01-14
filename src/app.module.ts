import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildDataSourceOptions } from './config/datasource';
import { WebzModule } from './modules/webz/webz.module';
import { PostsModule } from './modules/posts/posts.module';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

@Module({
  imports: [
    TypeOrmModule.forRoot(buildDataSourceOptions()),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('WEBZ_SYNC', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
      ],
    }),
    WebzModule,
    PostsModule,
  ],
})
export class AppModule {}
