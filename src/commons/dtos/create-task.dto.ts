import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Example } from 'tsoa';

export class CreateTaskDto {
  @IsString()
  @Example('Fix API bug')
  title!: string;

  @IsOptional()
  @IsString()
  @Example('Resolve the issue with user login flow')
  description?: string;

  @IsOptional()
  @IsDateString()
  @Example('2025-09-20T15:30:00.000Z')
  dueDate?: string;

  @IsOptional()
  @IsEmail()
  @Example('john.doe@example.com')
  assignedTo?: string;
}
