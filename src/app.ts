import express, { Application } from 'express';
import redisClient from './redis';

import generalRoutes from './routes/general.route';
import redisRoutes from './routes/redis.route';

const app: Application = express();

// -----------middleware for an Express.js-----------
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.json());
// parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
// app.cache = redisClient;
// app.set("cache", redisClient);
// -----------middleware for an Express.js-----------

// --------routes---------
app.use('/', generalRoutes);
app.use('/redis', redisRoutes);
// --------routes---------

export default app;
