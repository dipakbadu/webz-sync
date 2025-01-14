import { Injectable, Logger } from '@nestjs/common';
import { WebzService } from '../../webz/services/webz.service';
import { PostRepository } from '../repository/post-repository';
import { PostDto } from '../dto/create-posts.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    private readonly webzService: WebzService,
    private readonly postRepository: PostRepository,
  ) {}
  async fetchAndStorePosts(query: string, limit: number) {
    let totalStored = 0;
    let nextToken: string | null = null;

    this.logger.log(
      `Fetching and storing posts for query: ${query} with a limit of ${limit}`,
    );

    while (totalStored < limit) {
      const posts: PostDto[] = [];
      const numberOfPostsToStore = 200;

      while (posts.length < numberOfPostsToStore && totalStored < limit) {
        try {
          const data = await this.webzService.fetchPosts(query, nextToken);

          if (!data || !data.posts) {
            throw new Error('Invalid response from fetchPosts');
          }

          if (data.moreResultsAvailable) {
            nextToken = data.next;
          } else {
            nextToken = null;
          }

          const postsToStore = data.posts.map((post) => ({
            title: post.title,
            url: post.url,
            author: post.author,
            published: post.published,
            content: post.text,
          }));

          posts.push(...postsToStore);

          if (!nextToken) break;
        } catch (error) {
          this.logger.error('Error fetching posts:', error.message);
          throw error;
        }
      }

      try {
        const storedPosts = await this.postRepository.savePosts(posts);
        totalStored += storedPosts.length;

        this.logger.log(
          `${storedPosts.length} posts stored. Total stored: ${totalStored}/${limit}`,
        );
      } catch (error) {
        this.logger.error(
          'Error saving posts to the repository:',
          error.message,
        );
        throw error;
      }

      if (totalStored >= limit) break;
    }

    this.logger.log(
      `Completed fetching and storing posts. Total stored: ${totalStored}`,
    );
    return { stored: totalStored, remaining: limit - totalStored };
  }
}
