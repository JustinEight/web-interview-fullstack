import axios, { AxiosResponse } from 'axios';
import { ServerSchema } from './schema/find-server.schema';

export class ServerFinder {
  /**
   * Finds the online server with the lowest priority.
   * @param servers - List of servers with URLs and priorities.
   * @returns The server object with the lowest priority if online, or throws an error if none are online.
   */
  public static async findServer(
    servers: ServerSchema[]
  ): Promise<ServerSchema> {
    // Map each server request to a promise with a 5-second timeout.
    const requests = servers.map(
      (server) =>
        axios
          .get(server.url, { timeout: 5000 })
          .then((response: AxiosResponse) => {
            if (response.status >= 200 && response.status < 300) {
              return server; // Return the server if it's online
            }
            throw new Error(
              `Server ${server.url} responded with status ${response.status}`
            );
          })
          .catch(() => null) // Catch errors and return null for offline servers
    );

    // Execute all requests in parallel
    const results = await Promise.all(requests);

    // Filter out null (offline) results
    const onlineServers = results.filter(
      (server): server is ServerSchema => server !== null
    );

    if (onlineServers.length === 0) {
      throw new Error('No servers are online');
    }

    // Return the server with the lowest priority
    return onlineServers.reduce((lowest, current) =>
      current.priority < lowest.priority ? current : lowest
    );
  }
}
