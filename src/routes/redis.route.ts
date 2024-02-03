import express, { Request, Response, NextFunction } from 'express';
import redisClient from '../redis';


const router = express.Router();

router.get('/:username', cache, getRepos);
router.delete('/:username', deleteCache);

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
    await redisClient.set(username, repos);

    res.send(setResponse(username, repos, false));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

async function deleteCache(req: Request, res: Response) {
  const { username } = req.params;
  try {
    await redisClient.del(username);
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

// module.exports = router;
export default router;
