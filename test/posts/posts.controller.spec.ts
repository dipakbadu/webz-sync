import { PostsController } from '../../src/modules/posts/controllers/posts.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../../src/modules/posts/services/posts.service';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: jest.Mocked<PostsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsController,
        {
          provide: PostsService,
          useValue: {
            fetchAndStorePosts: jest.fn(),
          },
        },
      ],
    }).compile();

    postsService = module.get<PostsService>(
      PostsService,
    ) as jest.Mocked<PostsService>;
    postsController = module.get<PostsController>(PostsController);
  });

  describe('fetchPosts', () => {
    it('should fetch posts', async () => {
      const query = 'technology language:english';
      const posts = {
        stored: 1,
        remaining: 2,
      };
      postsService.fetchAndStorePosts.mockResolvedValue(posts);

      const response = await postsController.fetchPosts({ query, limit: 200 });
      expect(response).toEqual(posts);
    });
  });
});
