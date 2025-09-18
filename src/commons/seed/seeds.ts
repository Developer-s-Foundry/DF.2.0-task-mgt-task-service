import { faker } from '@faker-js/faker';
import { User, UserRole } from '../../entities/user.entity';
import { DataSource } from 'typeorm';

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
}
