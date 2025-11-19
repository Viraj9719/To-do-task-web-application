import type { Task } from '../types/task';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/tasks`;

const headers = {
  'Content-Type': 'application/json',
};

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (title: string, description: string): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

export const completeTask = async (taskId: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers,
  });
  if (!response.ok) {
    throw new Error('Failed to complete task');
  }
  return response.json();
};
