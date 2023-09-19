import 'reflect-metadata';

import { createClient } from 'redis';

import app from './app';
import { AppDataSource } from './data-source';

// ------redis------
import { Request, Response, NextFunction } from 'express';
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

app.get('/redis/:username', cache, getRepos);

// Make request to Github for data
async function getRepos(req: Request, res: Response) {
  try {
    console.log('Fetching Data...');
    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();
    console.log(data);

    const repos = data.public_repos;

    // Set data to Redis
    client.set(username, repos);

    res.send(setResponse(username, repos));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

// Cache middleware
async function cache(req: Request, res: Response, next: NextFunction) {
  const { username } = req.params;

  const repos = await client.get(username);
  if (repos !== null) {
    console.log('cache...');
    // res.send(setResponse(username, data));
    res.send(setResponse(username, repos));
  } else {
    next();
  }
}
// Set response
function setResponse(username: string, repos: string | number) {
  return `${username} has ${repos} Github repos`;
}
// ------redis------

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected');
    app.listen(5000, () => console.log('server running on port 5000'));
  })
  .catch((err) => console.log(err));
