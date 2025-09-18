import { DataSource } from 'typeorm';
import { config } from './config/config';
import { seedUsers } from './commons/seed/seeds';
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: `${config.DATABASE_USER}`,
  password: `${config.DATABASE_PASSWORD}`,
  database: `${config.DATABASE_NAME}`,
  entities: [User, Task],
  migrations: ['src/migrations/*{.ts,.js}'],
  // logging: true,
  // synchronize: true,
});

export const databaseConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    // await seedUsers(AppDataSource, 10);
    // console.log('Data Source has been seeded!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
};
