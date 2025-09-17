import { TaskStatus } from '../../database/entities/task.entity';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  assignedToId?: string;
  dueDate?: Date;
}