import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';

// import { createClient } from 'redis';

import app from './app';
import { AppDataSource } from './data-source';

// ------redis------
// let redisClient: any = null;

// (async () => {
//   redisClient = createClient();
//   redisClient.on('error', (err: any) => console.log('Redis Client Error', err));

//   await redisClient.connect();
// })();

// ------redis------



// ------redis------

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected');
    app.listen(5000, () => console.log('server running on port 5000'));
  })
  .catch((err) => console.log(err));
