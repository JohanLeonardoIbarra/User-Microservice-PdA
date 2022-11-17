import dotenv from 'dotenv';
dotenv.config({ path: '../' });

const env = process.env.ENV;

interface ConfigI {
  dbType: string;
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbDatabase: string;
  port: number;
  secretKey: string;
}

let config: ConfigI = {
  dbType: 'mysql',
  dbHost: 'localhost',
  dbPort: 3306,
  dbUsername: 'root',
  dbPassword: 'app-pass',
  dbDatabase: 'test',
  port: 8080,
  secretKey: 'nonSecretKey',
};

if (env === 'prod')
  config = {
    dbType: process.env.TYPE || '',
    dbHost: process.env.DB_HOST || '',
    dbPort: Number(process.env.DB_PORT),
    dbUsername: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASS || '',
    dbDatabase: process.env.DB_DATABASE || '',
    port: Number(process.env.PORT),
    secretKey: process.env.SECRET_KEY || '',
  };

export default config;
