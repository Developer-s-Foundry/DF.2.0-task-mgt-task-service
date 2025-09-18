import { CreateTaskDto } from '../commons/dtos/create-task.dto';
import { Task, TaskStatus } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';

export class TaskService {
  constructor(private dataSource: DataSource) {}

  public async createTask(
    adminEmail: string,
    taskData: CreateTaskDto
  ): Promise<{ message: string; data: any; successfully: boolean }> {
    const taskRepository = this.dataSource.getRepository(Task);
    const userRepository = this.dataSource.getRepository(User);

    const admin = await userRepository.findOneBy({ email: adminEmail });
    if (!admin || admin.role !== 'ADMIN') throw new Error('Only admin can create tasks!');

    let assignedTo = null;
    if (taskData.assignedTo) {
      assignedTo = await userRepository.findOneBy({ email: taskData.assignedTo });
      if (!assignedTo) throw new Error(' Assigned User not found!');
    }

    const task = taskRepository.create({
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
      createdBy: admin,
      assignedTo: assignedTo ?? undefined,
      status: TaskStatus.TODO,
    });

    await taskRepository.save(task);

    return { message: 'User was successfully created', data: task, successfully: true };
  }

  async getTasks(): Promise<{ message: string; data: any; successful: boolean }> {
    const taskRepository = this.dataSource.getRepository(Task);
    const tasks = await taskRepository.find({ relations: ['createdBy', 'assignedTo'] });
    return {
      message: 'Tasks were successfully fetched',
      data: tasks ? tasks : [],
      successful: true,
    };
  }

  async getTask(taskId: string): Promise<{ message: string; data: any; successful: boolean }> {
    const taskRepository = this.dataSource.getRepository(Task);
    const task = await taskRepository.findOne({ where: { id: taskId }, relations: ['createdBy', 'assignedTo'] });
    return {
      message: 'Task was successfully fetched',
      data: task ? task : [],
      successful: true,
    };
  }
}
