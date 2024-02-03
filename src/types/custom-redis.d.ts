// custom-redis.d.ts

declare module 'redis' {
  export function createClient(options?: any): any;
}
