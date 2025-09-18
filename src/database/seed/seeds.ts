import { faker } from '@faker-js/faker';
import { User, UserRole } from '../../database/entities/user.entity';
import { Task, TaskStatus } from '../../database/entities/task.entity';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../setupDatabase';

export async function seedUsers(dataSource: DataSource, count = 10) {
  const userRepository = dataSource.getRepository(User);

  const users: User[] = [];

  // create Admin
  const admin = userRepository.create({
    name: faker.name.fullName(),
    email: 'admin@df.com',
    role: UserRole.ADMIN,
  });

  users.push(admin);

  // Create radom users
  for (let i = 0; i < count; i++) {
    const user = userRepository.create({
      name: faker.name.fullName(),
      email: faker.internet.email().toLowerCase(),
      role: UserRole.USER,
    });

    users.push(user);
  }

  await userRepository.save(users);
  console.log(`✅ Seeded ${users.length} users (including 1 admin)`);

  return users;
}

export async function seedTasks(dataSource: DataSource, users: User[]) {
  const taskRepository = dataSource.getRepository(Task);

  const admin = users.find(user => user.role === UserRole.ADMIN);
  const regularUsers = users.filter(user => user.role === UserRole.USER);

  if (!admin || regularUsers.length === 0) {
    console.log('❌ Need at least one admin and one regular user to seed tasks');
    return;
  }

  const tasks: Task[] = [];
  const taskTitles = [
    'Complete project setup',
    'Implement user authentication',
    'Design database schema',
    'Create API documentation',
    'Set up CI/CD pipeline',
    'Write unit tests',
    'Implement task management features',
    'Create user dashboard',
    'Set up monitoring and logging',
    'Deploy to production'
  ];

  const statuses = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.BLOCKED];

  for (let i = 0; i < 10; i++) {
    const randomUser = regularUsers[Math.floor(Math.random() * regularUsers.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const daysFromNow = Math.floor(Math.random() * 30) + 1; // 1-30 days from now

    const task = taskRepository.create({
      title: taskTitles[i],
      description: faker.lorem.sentences(2),
      status: randomStatus,
      createdBy: admin,
      assignedTo: randomUser,
      dueDate: new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000)
    });

    tasks.push(task);
  }

  await taskRepository.save(tasks);
  console.log(`✅ Seeded ${tasks.length} tasks`);
}