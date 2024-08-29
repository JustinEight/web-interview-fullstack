import { ServerFinder } from '../src/server-finder';
import axios from 'axios';

// Mocking axios for the tests
jest.mock('axios');

describe('ServerFinder', () => {
  const servers = [
    { url: 'https://does-not-work.perfume.new', priority: 1 },
    { url: 'https://gitlab.com', priority: 4 },
    { url: 'http://app.scnt.me', priority: 3 },
    { url: 'https://offline.scentronix.com', priority: 2 },
  ];

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should return the online server with the lowest priority', async () => {
    (axios.get as jest.Mock).mockImplementation((url: string) => {
      switch (url) {
        case 'https://does-not-work.perfume.new':
          return Promise.reject(new Error('Request failed'));
        case 'https://gitlab.com':
          return Promise.resolve({ status: 200 });
        case 'http://app.scnt.me':
          return Promise.resolve({ status: 200 });
        case 'https://offline.scentronix.com':
          return Promise.reject(new Error('Request failed'));
      }
    });

    const result = await ServerFinder.findServer(servers);
    expect(result).toEqual({ url: 'http://app.scnt.me', priority: 3 });
  });

  it('should throw an error if no servers are online', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error('Request failed'))
    );

    await expect(ServerFinder.findServer(servers)).rejects.toThrow(
      'No servers are online'
    );
  });

  it('should handle request timeouts gracefully', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error('Timeout'))
    );

    await expect(ServerFinder.findServer(servers)).rejects.toThrow(
      'No servers are online'
    );
  });
});
