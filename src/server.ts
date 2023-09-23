import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';

import { createClient } from 'redis';

import app from './app';
import { AppDataSource } from './data-source';

// ------redis------
let redisClient: any = null;

(async () => {
  redisClient = createClient();
  redisClient.on('error', (err: any) => console.log('Redis Client Error', err));

  await redisClient.connect();
})();

// ------redis------

app.get('/redis/:username', cache, getRepos);
app.delete('/redis/:username', deleteCache);



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
    redisClient.set(username, repos);

    res.send(setResponse(username, repos, false));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}


function deleteCache(req: Request, res: Response) {
  const { username } = req.params;
  try {
    redisClient.del(username);
    res.send(`Redis cache removed ${username}`);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}


// Cache middleware
async function cache(req: Request, res: Response, next: NextFunction) {
  const { username } = req.params;

  const repos = await redisClient.get(username);
  if (repos !== null) {
    console.log('cache...');
    // res.send(setResponse(username, data));
    res.send(setResponse(username, repos, true));
  } else {
    next();
  }
}
// Set response
function setResponse(username: string, repos: string | number, cache: boolean) {
  return `${username} has ${repos} Github repos from ${
    cache ? 'cache' : 'server'
  }`;
}
// ------redis------

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected');
    app.listen(5000, () => console.log('server running on port 5000'));
  })
  .catch((err) => console.log(err));
