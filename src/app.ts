import express, { Express } from 'express';
import { SetupServer } from './setupServer';
import { databaseConnection } from './setupDatabase';

class Application {
  public initialize(): void {
    databaseConnection();
    const app: Express = express();
    const server: SetupServer = new SetupServer(app);
    server.start();
  }
}

const application: Application = new Application();
application.initialize();
