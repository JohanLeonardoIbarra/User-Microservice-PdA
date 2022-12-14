import 'reflect-metadata';
import { Server } from 'Server/Server';
import { DataSource } from 'typeorm';
import { User } from './Entity/User';
import config from './Config/env';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  entities: [User],
  synchronize: true,
  logging: false,
});

console.log(AppDataSource.options);

AppDataSource.initialize()
  .then(() => {
    const app = new Server();
    app.init();
  })
  .catch(error => console.log(error));

export default AppDataSource;
