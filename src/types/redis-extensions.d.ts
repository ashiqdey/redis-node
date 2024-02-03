// redis-extensions.d.ts

declare module 'redis' {
    interface RedisClient {
      getAsync: (key: string) => Promise<string | null>;
      setAsync: (key: string, value: any) => Promise<string | null>;
      delAsync: (key: string) => Promise<string | null>;
    }
  }
  