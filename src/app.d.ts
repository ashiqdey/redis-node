// app.d.ts
import { Application } from 'express';
// import { RedisClient } from 'redis';

declare module 'express' {
  interface Application {
    cache?: any; 
  }
}
