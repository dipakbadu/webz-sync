import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../../src/modules/posts/services/posts.service';
import { WebzService } from '..../../src/modules/webz/services/webz.service';
import { PostRepository } from '../../src/modules/posts/repository/post-repository';
jest.mock('../src/modules/webz/services/webz.service');
jest.mock('../src/modules/posts/repository/post-repository');

describe('PostsService', () => {
  let postsService: PostsService;
  let webzService: jest.Mocked<WebzService>;
  let postRepository: jest.Mocked<PostRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: WebzService,
          useValue: {
            fetchPosts: jest.fn(),
          },
        },
        {
          provide: PostRepository,
          useValue: {
            savePosts: jest.fn(),
          },
        },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);

    webzService = module.get<WebzService>(
      WebzService,
    ) as jest.Mocked<WebzService>;
    postRepository = module.get<PostRepository>(
      PostRepository,
    ) as jest.Mocked<PostRepository>;
  });

  describe('fetchAndStorePosts', () => {
    it('should fetch and store posts successfully', async () => {
      const query = 'technology language:english';

      const mockData = {
        posts: [
          {
            id: '1',
            title: 'Post 1',
            url: 'http://example.com/1',
            published: new Date(),
            content: 'Content 1',
          },
          {
            id: '2',
            title: 'Post 2',
            url: 'http://example.com/2',
            published: new Date(),
            content: 'Content 2',
          },
        ],
        next: 'next-token',
        moreResultsAvailable: true,
      };
      webzService.fetchPosts.mockResolvedValue(mockData);
      postRepository.savePosts.mockResolvedValue(mockData.posts);
      const postDetails = await postsService.fetchAndStorePosts(query, 200);
      expect(postDetails.stored).toEqual(200);
      expect(postDetails.remaining).toEqual(0);
    });
  });

  describe('fetchAndStorePosts', () => {
    it('should throw error if post is null', async () => {
      const query = 'technology language:english';

      const mockData = {
        posts: null,
        next: 'next-token',
        moreResultsAvailable: true,
      };
      webzService.fetchPosts.mockResolvedValue(mockData);
      await expect(postsService.fetchAndStorePosts(query, 200)).rejects.toThrow(
        'Invalid response from fetchPosts',
      );
    });
  });
});
