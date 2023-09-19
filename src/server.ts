import 'reflect-metadata';

import app from './app'
import { AppDataSource } from './data-source';


AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected');
    app.listen(5000, () => console.log('server running on port 5000'));
  })
  .catch((err) => console.log(err));
