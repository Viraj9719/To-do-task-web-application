import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getTasks, createTask, completeTask } from './db.js';

const router = Router();

router.get('/api/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/api/tasks', async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required' });
      return;
    }

    const id = uuidv4();
    const task = await createTask(id, title, description);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.put('/api/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await completeTask(id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json(task);
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ error: 'Failed to complete task' });
  }
});

export default router;
