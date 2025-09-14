import 'reflect-metadata';

import { Application, json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const SERVER_PORT = 4000;

export class SetupServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.startHttpServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(helmet());
    app.use(
      cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(json());
    app.use(urlencoded({ extended: true }));
  }

  private async startHttpServer(app: Application): Promise<void> {
    try {
      app.listen(SERVER_PORT, () => {
        console.log(`HTTP server is running on port ${SERVER_PORT}`);
      });
    } catch (error) {
      console.error('Error starting HTTP server:', error);
    }
  }
}
