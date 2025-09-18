import { IsEmail, IsOptional, IsString } from 'class-validator';

export class TaskResponseDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  dueDate?: string;

  @IsString()
  status: string;

  @IsEmail()
  createdBy: string;

  @IsOptional()
  @IsEmail()
  assignedTo?: string;
}

export class ApiResponse<T> {
  message!: string;
  data!: T;
  successfully!: boolean;
}

export class GetTasksResponse {
  message: string;
  data: TaskResponseDto[];
  successful: boolean;
}
