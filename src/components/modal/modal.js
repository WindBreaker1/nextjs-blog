import React from "react";
import styles from "./modal.module.css";

const Modal = ({ field, value, onClose, onSave, onInputChange }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Edit {field}</h2>
        <input
          type="text"
          value={value}
          onChange={onInputChange}
          placeholder={`Enter new ${field}`}
        />
        <div className={styles.modalActions}>
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
