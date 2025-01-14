import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { WebzModule } from '../webz/webz.module';
import { Post } from './entities/posts.entity';
import { PostRepository } from './repository/post-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), WebzModule],
  controllers: [PostsController],
  providers: [PostsService, PostRepository],
  exports: [PostsService],
})
export class PostsModule {}
