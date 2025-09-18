import { DataSource, Repository } from "typeorm";
import { UpdateTaskDto } from "../commons/dtos/update-task.dto";
import { CreateTaskDto } from "../commons/dtos/create-task.dto";
import { Task, TaskStatus } from "../database/entities/task.entity";
import { User } from "../database/entities/user.entity";

export class TaskService {
  private taskRepository: Repository<Task>;
  private userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.taskRepository = this.dataSource.getRepository(Task);
    this.userRepository = this.dataSource.getRepository(User);
  }

  public async createTask(
    adminEmail: string,
    taskData: CreateTaskDto
  ): Promise<{ message: string; data: any; successfully: boolean }> {
    const admin = await this.userRepository.findOneBy({ email: adminEmail });
    if (!admin || admin.role !== "ADMIN")
      throw new Error("Only admin can create tasks!");

    let assignedTo = null;
    if (taskData.assignedTo) {
      assignedTo = await this.userRepository.findOneBy({
        email: taskData.assignedTo,
      });
      if (!assignedTo) throw new Error(" Assigned User not found!");
    }

    const task = this.taskRepository.create({
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
      createdBy: admin,
      assignedTo: assignedTo ?? undefined,
      status: TaskStatus.TODO,
    });

    await this.taskRepository.save(task);

    return {
      message: "User was successfully created",
      data: task,
      successfully: true,
    };
  }

  async getTasks(): Promise<{
    message: string;
    data: any;
    successful: boolean;
  }> {
    const taskRepository = this.dataSource.getRepository(Task);
    const tasks = await taskRepository.find({
      relations: ["createdBy", "assignedTo"],
    });
    return {
      message: "Tasks were successfully fetched",
      data: tasks ? tasks : [],
      successful: true,
    };
  }

  async getTask(
    taskId: string
  ): Promise<{ message: string; data: any; successful: boolean }> {
    const taskRepository = this.dataSource.getRepository(Task);
    const task = await taskRepository.findOne({
      where: { id: taskId },
      relations: ["createdBy", "assignedTo"],
    });
    return {
      message: "Task was successfully fetched",
      data: task ? task : [],
      successful: true,
    };
  }

  public async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      return null;
    }

    Object.assign(task, updateTaskDto);

    return await this.taskRepository.save(task);
  }

  public async deleteTask(id: string): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected !== 0;
  }
}
