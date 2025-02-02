import { useEffect } from "react";
import styles from './notification.module.css'; // Import CSS for styling

export default function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Auto-close after 5 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null; // Don't render if no message

  return (
    <div className={`${styles.notification} ${type === "error" ? styles.error : styles.success}`}>
      {message}
      <button className={styles.closeButton} onClick={onClose}>&times;</button>
    </div>
  );
}
