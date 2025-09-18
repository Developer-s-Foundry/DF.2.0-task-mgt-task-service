import { CreateTaskDto } from '../commons/dtos/create-task.dto';
import { TaskService } from './../services/task.service';
import { Body, Controller, Get, Post, Route, SuccessResponse } from 'tsoa';
import { AppDataSource } from '../setupDatabase';
import { TaskResponseDto } from '../commons/dtos/apiResponse.dtos';

@Route('tasks')
export class TaskController extends Controller {
  private taskService: TaskService;

  constructor() {
    super();
    this.taskService = new TaskService(AppDataSource);
  }

  @Post('/')
  @SuccessResponse('201', 'Created')
  public async createTask(@Body() requestBody: CreateTaskDto) {
    const adminEmail = 'admin@df.com';
    const createdTask = await this.taskService.createTask(adminEmail, requestBody);
    return {
      message: 'Task was successfully created',
      data: createdTask,
      successfully: true,
    };
  }

  @Get('/')
  public async getTasks(): Promise<TaskResponseDto[]> {
    const result = await this.taskService.getTasks();

    return result.data.map((task: any) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
      createdBy: task.createdBy?.email,
      assignedTo: task.assignedTo?.email,
    }));
  }

  @Get('/:taskId')
  public async getTaskById(taskId: string): Promise<TaskResponseDto> {
    const result = await this.taskService.getTask(taskId);

    return {
      id: result.data.id,
      title: result.data.title,
      description: result.data.description,
      status: result.data.status,
      dueDate: result.data.dueDate,
      createdBy: result.data.createdBy?.email,
      assignedTo: result.data.assignedTo?.email,
    };
  }
}
