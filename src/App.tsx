import { useEffect, useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { fetchTasks, createTask, completeTask } from './services/api';
import type { Task } from './types/task';
import { ListTodo } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (title: string, description: string) => {
    try {
      await createTask(title, description);
      await loadTasks();
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to complete task');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ListTodo className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Task Manager</h1>
          </div>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <TaskForm onSubmit={handleCreateTask} />
          </div>

          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Tasks
              </h2>
              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  Loading tasks...
                </div>
              ) : (
                <TaskList tasks={tasks} onComplete={handleCompleteTask} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
