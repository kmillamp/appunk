import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
};

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    // Exemplo de tarefas para demonstração
    // Em uma implementação real, você buscaria do Supabase
    const demoTasks: Task[] = [
      {
        id: '1',
        title: 'Finalizar mixagem do novo single',
        status: 'todo',
        priority: 'high',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Confirmar agenda com produtor',
        status: 'in_progress',
        priority: 'medium',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Revisar contrato de show',
        status: 'todo',
        priority: 'low',
        createdAt: new Date().toISOString(),
      },
    ];

    setTasks(demoTasks);
    setLoading(false);
  }, [user]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string, newStatus: 'todo' | 'in_progress' | 'completed') => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, loading, addTask, toggleTask, removeTask };
};