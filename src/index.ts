import 'reflect-metadata';
import { Server } from 'Server/Server';
import { DataSource } from 'typeorm';
import { User } from './Entity/User';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'app-pass',
  database: 'test',
  entities: [User],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    const app = new Server();
    app.init();
  })
  .catch(error => console.log(error));

export default AppDataSource;
