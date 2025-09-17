import { taskService, TaskService } from '../services/task.service';
import { Controller, Get, Post, Route } from 'tsoa';

@Route('tasks')
export class TaskController extends Controller {
  @Post('/')
  public async createTask() {
    await taskService.createTask();
  }
}
