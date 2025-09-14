import { Request, Response } from "express";
import { AppDataSource } from "../setupDatabase";
import { Task } from "../entity/tasks.entity";
import { validate } from "class-validator";

export class TaskController {
  private taskRepository = AppDataSource.getRepository(Task);

  // PUT /api/tasks/:id - Update task
  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const taskId = parseInt(id);

      if (isNaN(taskId)) {
        res.status(400).json({
          success: false,
          message: "Invalid task ID",
        });
        return;
      }

      // Find existing task
      const existingTask = await this.taskRepository.findOne({
        where: { id: taskId },
      });

      if (!existingTask) {
        res.status(404).json({
          success: false,
          message: "Task not found",
        });
        return;
      }

      // Update task properties
      const { name, description, status } = req.body;
      if (!!name) existingTask.name = name;
      if (!!description) existingTask.description = description;
      if (!!status) existingTask.status = status;

      // Validate updated task
      const errors = await validate(existingTask);
      if (errors.length > 0) {
        const validationErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));

        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validationErrors,
        });
        return;
      }

      // Save updated task
      const updatedTask = await this.taskRepository.save(existingTask);

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update task",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // DELETE /api/tasks/:id - Delete task
  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const taskId = parseInt(id);

      if (isNaN(taskId)) {
        res.status(400).json({
          success: false,
          message: "Invalid task ID",
        });
        return;
      }

      // Find existing task
      const existingTask = await this.taskRepository.findOne({
        where: { id: taskId },
      });

      if (!existingTask) {
        res.status(404).json({
          success: false,
          message: "Task not found",
        });
        return;
      }

      // Delete task
      await this.taskRepository.remove(existingTask);

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete task",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
