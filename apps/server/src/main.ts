/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import bodyParser from 'body-parser';
import express from 'express';
import * as path from 'path';
import { serversSchema } from './schema/find-server.schema';
import { ServerFinder } from './server-finder';

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

app.post('/api/find-servers', async (req, res) => {
  const { servers } = req.body;

  const result = serversSchema.safeParse(servers);
  if (result.success) {
    try {
      const server = await ServerFinder.findServer(result.data);
      res.send(server);
    } catch (error) {
      res.status(500).send({ error: 'No servers are online' });
    }
  } else {
    res.status(400).send(result.error);
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
