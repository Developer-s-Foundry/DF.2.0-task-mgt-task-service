import { DataSource } from "typeorm";
import { config } from "./config/config";
import { seedUsers, seedTasks } from "./database/seed/seeds";
import { User } from "./database/entities/user.entity";
import { Task } from "./database/entities/task.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DATABASE_HOST,
  port: config.DATABASE_PORT,
  username: `${config.DATABASE_USER}`,
  password: `${config.DATABASE_PASSWORD}`,
  database: `${config.DATABASE_NAME}`,
  ssl: config.SSL_ENABLED,
  entities: [User, Task],
  migrations: ["src/database/migrations/*{.ts,.js}"],
  logging: true,
  // synchronize: true,
});

export const databaseConnection = async () => {
  try {
    await AppDataSource.initialize();
    // console.log('Data Source has been initialized!');
    // const users = await seedUsers(AppDataSource, 10);
    // await seedTasks(AppDataSource, users);
    // console.log('Data Source has been seeded!');
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};
