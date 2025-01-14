import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use Winston as the logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(ConfigService);
  const port = configService.get<string>('APP_PORT') || 3000;

  const logger = new Logger('Main');

  //swagger configuration
  configureSwagger(app);

  await app.listen(port);
  logger.log(`Application started at port: ${port}`);
}

bootstrap();

function configureSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('WEBZ SYNC')
    .setDescription('WEBZ SYNC API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/play', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: 8888,
    },
  });
}
