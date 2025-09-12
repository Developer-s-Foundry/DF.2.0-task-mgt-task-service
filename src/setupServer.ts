import { Application } from 'express';
import http from 'http';

const SERVER_PORT = 4000;

export class SetupServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.startHttpServer(this.app);
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
