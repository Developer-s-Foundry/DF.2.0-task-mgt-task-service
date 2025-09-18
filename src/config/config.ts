import dotenv from 'dotenv';

dotenv.config();

class Config {
  public DATABASE_HOST: string | undefined;
  public DATABASE_PORT: number | undefined;
  public SSL_ENABLED: boolean;
  public DATABASE_NAME: string | undefined;
  public DATABASE_USER: string | undefined;
  public DATABASE_PASSWORD: string | undefined;

  constructor() {
    this.DATABASE_HOST = process.env.DB_HOST || 'localhost';
    this.DATABASE_PORT = Number(process.env.DB_HOST) || 5432;
    this.SSL_ENABLED = process.env.DB_SSL_ENABLED === 'true';
    this.DATABASE_NAME = process.env.DB_NAME || '';
    this.DATABASE_USER = process.env.DB_USER || '';
    this.DATABASE_PASSWORD = process.env.DB_PASSWORD || '';
  }
}

export const config: Config = new Config();
