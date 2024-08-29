import request from 'supertest';
import { app } from './../../src/main';

import { ServerFinder } from '../../src/server-finder';

// Unit test for the /api/find-servers route
describe('POST /api/find-servers', () => {
  it('should return the online server with the lowest priority', async () => {
    // Mock the findServer function
    jest.spyOn(ServerFinder, 'findServer').mockResolvedValue({
      url: 'http://app.scnt.me',
      priority: 3,
    });

    const response = await request(app)
      .post('/api/find-servers')
      .send({
        servers: [
          { url: 'https://does-not-work.perfume.new', priority: 1 },
          { url: 'https://gitlab.com', priority: 4 },
          { url: 'http://app.scnt.me', priority: 3 },
          { url: 'https://offline.scentronix.com', priority: 2 },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ url: 'http://app.scnt.me', priority: 3 });
  });

  it('should return a 400 status if the request body is invalid', async () => {
    const response = await request(app)
      .post('/api/find-servers')
      .send({
        servers: [
          { url: 'invalid-url', priority: 1 }, // Invalid URL
          { url: 'https://gitlab.com', priority: 4 },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('issues'); // Zod error details
  });

  it('should return a 500 status if no servers are online', async () => {
    // Mock the findServer function to throw an error

    jest
      .spyOn(ServerFinder, 'findServer')
      .mockRejectedValue(new Error('No servers are online'));

    const response = await request(app)
      .post('/api/find-servers')
      .send({
        servers: [
          { url: 'https://does-not-work.perfume.new', priority: 1 },
          { url: 'https://gitlab.com', priority: 4 },
          { url: 'http://app.scnt.me', priority: 3 },
          { url: 'https://offline.scentronix.com', priority: 2 },
        ],
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'No servers are online' });
  });
});
