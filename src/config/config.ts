import dotenv from 'dotenv';

dotenv.config();

class Config {
  public DATABASE_NAME: string | undefined;
  public DATABASE_USER: string | undefined;
  public DATABASE_PASSWORD: string | undefined;

  constructor() {
    this.DATABASE_NAME = process.env.DB_NAME || '';
    this.DATABASE_USER = process.env.DB_USER || '';
    this.DATABASE_PASSWORD = process.env.DB_PASSWORD || '';
  }
}

export const config: Config = new Config();
