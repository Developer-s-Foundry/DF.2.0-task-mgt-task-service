export class TaskService {
  public async createTask(): Promise<string> {
    return 'success';
  }
}

export const taskService = new TaskService();
