import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
}

export const TaskCard = ({ task, onComplete }: TaskCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1 truncate">
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {task.description}
          </p>
        </div>
        <button
          onClick={() => onComplete(task.id)}
          className="px-4 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex-shrink-0"
        >
          Done
        </button>
      </div>
    </div>
  );
};
