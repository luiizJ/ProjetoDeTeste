import React, { useState } from "react";
import Styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskTitle);
    setTaskTitle("");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modalContent}>
        <div className={Styles.gap}>
          <h1>Nova Tarefa</h1>
          <h2>Tarefa</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título da Tarefa"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />

          <div className={Styles.modalButtons}>
            <button className={Styles.buttonW} type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className={Styles.buttonW} type="submit">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
