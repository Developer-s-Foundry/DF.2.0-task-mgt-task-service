import { DataSource } from 'typeorm';
import { config } from './config/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: `${config.DATABASE_USER}`,
  password: `${config.DATABASE_PASSWORD}`,
  database: `${config.DATABASE_NAME}`,
  entities: ['src/entity/*.ts'],
  logging: true,
  synchronize: true,
});

export const databaseConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
};
