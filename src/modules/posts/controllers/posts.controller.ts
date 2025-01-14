import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { FetchPostsDto } from '../dto/fetch-posts.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('')
  @ApiBody({ type: FetchPostsDto })
  async fetchPosts(@Body() fetchPostsDto: FetchPostsDto) {
    const { query, limit } = fetchPostsDto;

    if (!query || query.trim() === '') {
      throw new BadRequestException(
        'Query parameter is required and cannot be empty',
      );
    }
    return this.postsService.fetchAndStorePosts(query, limit);
  }
}
