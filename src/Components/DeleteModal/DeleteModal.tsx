import React from "react";
import Styles from "./DeleteModal.module.scss";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modalContent}>
        <div className={Styles.gap}>
          <h1>Confirmar Exclusão</h1>
          <h2>Você tem certeza que deseja excluir esta tarefa?</h2>
        </div>
        <div className={Styles.modalButtons}>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" onClick={onConfirm}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};
