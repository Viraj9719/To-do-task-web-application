import { TaskCard } from './TaskCard';
import type { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
}

export const TaskList = ({ tasks, onComplete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No tasks yet. Create your first task to get started!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onComplete={onComplete} />
      ))}
    </div>
  );
};
