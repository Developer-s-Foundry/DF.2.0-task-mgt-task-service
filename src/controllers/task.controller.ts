import { CreateTaskDto } from "../commons/dtos/create-task.dto";
import { AppDataSource } from "../setupDatabase";
import { TaskResponseDto } from "../commons/dtos/apiResponse.dtos";
import { TaskService } from "../services/task.service";
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Path,
  Body,
  SuccessResponse,
} from "tsoa";
import { UpdateTaskDto } from "../commons/dtos/update-task.dto";
import { Task } from "../database/entities/task.entity";

@Route("tasks")
export class TaskController extends Controller {
  private taskService: TaskService;

  constructor() {
    super();
    this.taskService = new TaskService(AppDataSource);
  }

  @Post("/")
  @SuccessResponse("201", "Created")
  public async createTask(@Body() requestBody: CreateTaskDto) {
    const adminEmail = "admin@df.com";
    const createdTask = await this.taskService.createTask(
      adminEmail,
      requestBody
    );
    return {
      message: "Task was successfully created",
      data: createdTask,
      successfully: true,
    };
  }

  @Get("/")
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

  @Get("/:taskId")
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

  @Put("/{id}")
  public async updateTask(
    @Path() id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task | null> {
    const updatedTask = await this.taskService.updateTask(id, updateTaskDto);

    if (!updatedTask) {
      this.setStatus(404);
      return null;
    }

    return updatedTask;
  }

  @Delete("/{id}")
  public async deleteTask(@Path() id: string): Promise<{ success: boolean }> {
    const deleted = await this.taskService.deleteTask(id);

    if (!deleted) {
      this.setStatus(404);
      return { success: false };
    }

    return { success: true };
  }
}
