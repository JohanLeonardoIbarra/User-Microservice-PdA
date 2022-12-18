import express from 'express';
import cors from 'cors';
import UserRouter from 'Router/User';
import config from 'Config/env';

export class Server {
  private app = express();
  private port: number;

  constructor() {
    this.port = config.port;
    this.app.use(express.json());
    this.app.use(cors());
    this.routes();
  }

  public init(port?: number): void {
    if (port) this.port = port;

    this.listen();
  }

  private routes(): void {
    this.app.use('/user', UserRouter);
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log('Server listening on port: ' + this.port);
    });
  }
}
