import { Module } from '@nestjs/common';
import { WebzService } from './services/webz.service';
import { WebzController } from './controllers/webz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([]), HttpModule],
  controllers: [WebzController],
  providers: [WebzService],
  exports: [WebzService],
})
export class WebzModule {}
