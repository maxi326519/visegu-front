
import styles from "./AccessDenied.module.css";

export default function AccessDenied() {
  return (
    <div className={styles.background}>
      <span>You do not have access to this resource</span>
    </div>
  );
}
