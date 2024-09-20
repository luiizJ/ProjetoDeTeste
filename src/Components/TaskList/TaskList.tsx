"use client";
import { useState, useContext } from "react";
import { TaskContext } from "../../Context/TasksContext";
import { Modal } from "../AddTaskModal/Modal";
import { DeleteTaskModal } from "../DeleteModal/DeleteModal";
import { MdDeleteOutline } from "react-icons/md";
import Styles from "./Tasks.module.scss";

export const Tasks: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para o modal de exclusão
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null); // Armazena a tarefa que será excluída
  const { tasks, setTasks } = useContext(TaskContext);

  // Função para adicionar nova tarefa
  const handleSubmit = (taskTitle: string) => {
    if (taskTitle.length < 3) {
      alert("Não é possível adicionar tarefa com menos de 4 caracteres.");
      return;
    }

    const activeTasks = tasks.filter((task) => !task.done);
    if (activeTasks.length >= 3) {
      alert("Limite máximo de 3 tarefas com status 'pendente'");
      return;
    }

    const newTask = [
      ...tasks,
      { id: new Date().getTime(), title: taskTitle, done: false },
    ];
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };

  // Função para abrir o modal de confirmação de exclusão
  const handleOpenDeleteModal = (taskID: number) => {
    setTaskToDelete(taskID);
    setIsDeleteModalOpen(true); // Abre o modal de confirmação
  };

  // Função para excluir a tarefa
  const handleDelete = () => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsDeleteModalOpen(false); // Fecha o modal após a exclusão
  };

  // Função para alterar o status de uma tarefa
  function handleToggleStatus(taskID: number) {
    const updatedTasks = tasks.map((task) => {
      if (taskID === task.id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const activeTasks = tasks.filter((task) => !task.done);
  const completedTasks = tasks.filter((task) => task.done);

  return (
    <section className={Styles.padrao}>
      <div className={Styles.container}>
        <h2>Suas tarefas de hoje</h2>
        <ul>
          {activeTasks.map((task) => (
            <li key={task.id}>
              <input
                id={`task-${task.id}`}
                type="checkbox"
                checked={task.done}
                onChange={() => handleToggleStatus(task.id)}
              />
              <label htmlFor={`task-${task.id}`}>{task.title}</label>
              <MdDeleteOutline
                onClick={() => handleOpenDeleteModal(task.id)} // Abre o modal de exclusão
                className={Styles.deleteIcon}
              />
            </li>
          ))}
        </ul>

        <div className={Styles.finish}>
          <h2>Tarefas finalizadas</h2>
          <ul>
            {completedTasks.map((task) => (
              <li key={task.id}>
                <input
                  id={`task-${task.id}`}
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleToggleStatus(task.id)}
                />
                <label htmlFor={`task-${task.id}`} className={Styles.done}>
                  {task.title}
                </label>
                <MdDeleteOutline
                  onClick={() => handleOpenDeleteModal(task.id)} // Abre o modal de exclusão
                  className={Styles.deleteIcon}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className={Styles.ModalButton}
      >
        Adicionar Tarefa
      </button>

      {/* Modal para adicionar tarefas */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* Modal de confirmação de exclusão */}
      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete} // Chama a função de exclusão
      />
    </section>
  );
};
