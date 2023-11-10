
import styles from "./Loading.module.css";
import loading from "../../assets/img/loading.gif";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <img src={loading} alt="loading" />
    </div>
  );
}