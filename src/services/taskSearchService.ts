import { DataSource } from 'typeorm';
import { Task, TaskStatus } from '../entities/task.entity';

interface SearchFilterOptions {
  keyword?: string;
  status?: TaskStatus;
  priority?: string;
  assignedTo?: string;
}

export class TaskSearchService {
  constructor(private dataSource: DataSource) {}

  public async searchAndFilter(
    options: SearchFilterOptions
  ): Promise<{ message: string; data: any; successful: boolean }> {
    const taskRepository = this.dataSource.getRepository(Task);

    const query = taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.createdBy', 'createdBy')
      .leftJoinAndSelect('task.assignedTo', 'assignedTo');

    
    if (options.keyword) {
      query.andWhere('(task.title ILIKE :keyword OR task.description ILIKE :keyword)', {
        keyword: `%${options.keyword}%`,
      });
    }

    if (options.status) {
      query.andWhere('task.status = :status', { status: options.status });
    }

  
    if (options.priority) {
      query.andWhere('task.priority = :priority', { priority: options.priority });
    }

  
    if (options.assignedTo) {
      query.andWhere('assignedTo.email = :assignedTo', { assignedTo: options.assignedTo });
    }

    const tasks = await query.getMany();

    return {
      message: tasks.length > 0 ? 'Tasks retrieved successfully' : 'No tasks found',
      data: tasks,
      successful: tasks.length > 0,
    };
  }
}
