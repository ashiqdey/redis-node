// redis.mjs

import * as redis from 'redis';
// import redis, { RedisClient } from 'redis';
import { promisify } from 'util';
// Create a Redis client
const client = redis.createClient();


// Promisify Redis functions for better async/await support
// client.getAsync = promisify(client.get).bind(client);
// client.setAsync = promisify(client.set).bind(client);
// client.delAsync = promisify(client.del).bind(client);

// Handle Redis connection errors


client.on('connect', function() {
  console.log('Redis Database connected'+'\n');
});

client.on('reconnecting', function() {
  console.log('Redis client reconnecting');
});

client.on('ready', function() {
  console.log('Redis client is ready');
});

client.on('error', function (err: string) {
  console.log('Redis Error ' + err);
});


client.on('end', function() {
  console.log('\nRedis client disconnected');
  console.log('Server is going down now...');
  process.exit();
});


export default client;

// import { createClient } from 'redis';

// let redisClient: any = null;

// (async () => {
//   redisClient = createClient();
//   redisClient.on('error', (err: any) => console.log('Redis Client Error', err));

//   await redisClient.connect();
//   console.log("redis client connected");
// })();

// export default redisClient;
