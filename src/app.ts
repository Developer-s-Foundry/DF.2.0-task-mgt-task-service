import express, { Express } from 'express';
import { SetupServer } from './setupServer';

class Application {
  public initialize(): void {
    const app: Express = express();
    const server: SetupServer = new SetupServer(app);
    server.start();
  }
}

const application: Application = new Application();
application.initialize();
