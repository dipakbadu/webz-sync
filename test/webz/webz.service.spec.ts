import axios from 'axios';
import { WebzService } from '../../src/modules/webz/services/webz.service';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WebzService', () => {
  let webzService: WebzService;

  beforeEach(() => {
    webzService = new WebzService();
  });

  describe('fetchPosts', () => {
    it('should call posts fetch API', async () => {
      const query = 'technology language:english';
      const nextToken = 'next-token';

      const mockedResponse = {
        posts: [],
        next: 'next',
        moreResultsAvailable: false,
      };
      mockedAxios.get.mockResolvedValueOnce({
        data: mockedResponse,
      });

      const postsResponse = await webzService.fetchPosts(query, nextToken);

      expect(mockedAxios.get).toHaveBeenCalled();

      expect(postsResponse).toEqual(mockedResponse);
    });
  });

  it('should handle axios.get errors', async () => {
    const mockError = new Error('Error');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    await expect(webzService.fetchPosts('query', 'next-token')).rejects.toThrow(
      'Error',
    );
    expect(mockedAxios.get).toHaveBeenCalled();
  });
});
