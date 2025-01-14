import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebzService {
  private readonly apiUrl = 'https://api.webz.io/filterWebContent';
  private readonly apiToken = process.env.WEBZ_API_KEY;
  private readonly logger = new Logger(WebzService.name);

  async fetchPosts(
    query: string,
    nextToken: string | null = null,
  ): Promise<{
    posts: any[];
    next: string | null;
    moreResultsAvailable: boolean;
  }> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          token: this.apiToken,
          q: query,
          next: nextToken,
        },
      });
      const { posts, next, moreResultsAvailable } = response.data;

      return {
        posts,
        next,
        moreResultsAvailable: moreResultsAvailable > 0,
      };
    } catch (error) {
      this.logger.error(
        `Error fetching posts from Webz.io: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
