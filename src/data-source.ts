import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Profile } from './entity/Profile';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test',
  synchronize: true,
  logging: true,
  // entities: ["src/entites/*{.ts,.js}"],
  entities: [User, Profile],
  migrations: [],
  subscribers: [],
});
