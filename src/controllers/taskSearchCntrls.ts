import { Controller, Get, Query, Route } from 'tsoa';
import { AppDataSource } from '../setupDatabase';
import { TaskSearchService } from '../services/taskSearchService';
import { TaskResponseDto } from '../commons/dtos/apiResponse.dtos';
import { TaskStatus } from '../entities/task.entity';

@Route('tasks/search')
export class TaskSearchController extends Controller {
  private taskSearchService: TaskSearchService;

  constructor() {
    super();
    this.taskSearchService = new TaskSearchService(AppDataSource);
  }

  
  @Get('/')
  public async searchAndFilterTasks(
    @Query() keyword?: string,
    @Query() status?: TaskStatus,
    @Query() priority?: string,
    @Query() assignedTo?: string,
  ): Promise<TaskResponseDto[]> {
    const result = await this.taskSearchService.searchAndFilter({
      keyword,
      status,
      priority,
      assignedTo,
    });

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
}
