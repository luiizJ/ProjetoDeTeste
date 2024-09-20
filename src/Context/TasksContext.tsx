"use client";
import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext({} as taskData);
interface TaskProvideProps {
  children: React.ReactNode;
}

export interface task {
  title: string;
  done: boolean;
  id: number;
}

interface taskData {
  tasks: task[];
  setTasks: React.Dispatch<React.SetStateAction<task[]>>;
}

export const TaskProvide: React.FC<TaskProvideProps> = ({ children }) => {
  const [tasks, setTasks] = useState([] as task[]);

  useEffect(() => {
    const taskOnLocalStorage = localStorage.getItem("tasks");
    if (taskOnLocalStorage) {
      setTasks(JSON.parse(taskOnLocalStorage));
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
