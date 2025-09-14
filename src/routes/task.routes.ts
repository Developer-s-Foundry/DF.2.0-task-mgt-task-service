import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();
const taskController = new TaskController();

// PUT /api/tasks/:id - Update task
router.put('/:id', taskController.updateTask.bind(taskController));

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', taskController.deleteTask.bind(taskController));

export default router;
