import 'reflect-metadata';

import { readFileSync } from 'fs';
import swaggerUI from 'swagger-ui-express';
import { join } from 'path';
import { Application, json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { RegisterRoutes } from './swagger/routes';

const SERVER_PORT = 4000;

const swaggerDoc = JSON.parse(readFileSync(join(process.cwd(), 'src/swagger/swagger.json'), 'utf-8'));

export class SetupServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.startHttpServer(this.app);
    this.routeMiddleware(this.app);
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

  private routeMiddleware(app: Application): void {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    RegisterRoutes(app);
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
